<script lang="ts">
  import axios from "axios"
  import { onMount } from "svelte"
  import Time, { svelteTime } from "svelte-time"

  import Contact from "./Contact.svelte"
  import EmojiMultiple from "../../components/EmojiMultiple.svelte"
  import Send from "../../components/Send.svelte"

  export let currentUser:User = {
    ID: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: ""
  }
  export let currentChatUser: User
  let messages: Message[] = []
    
  let formData = {
    content: "",
    sender: currentUser.ID,
    recipient: currentChatUser.ID
  };

  let socket: any

  onMount(() => {
    socket = new WebSocket("ws://localhost:8080/api/ws")

    socket.onopen = () => {
      console.log("WebSocket connection established!")
    };

    socket.onmessage = (event: any) => {
      console.log("Received message:", event.data);
      // Handle the received message from the server
    };

    socket.onerror = (error: any) => {
      console.error("WebSocket error:", error);
    }

    socket.onclose = (event: any) => {
      console.log("WebSocket connection closed with code:", event.code)
    }
  })

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();

    socket.send(JSON.stringify(formData));
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:8080/api/saveMessage",
        {
          sender: currentUser.ID.toString(),
          recipient: currentChatUser.ID.toString(),
          content: formData.content,
        },
        config // Move the config object to the correct position
      );

      // If the request is successful, you can proceed with updating the messages
      const msgs = [...messages];
      msgs.push({ sender: currentUser.firstname + currentUser.lastname, message: formData.content })
      messages = msgs
      formData.content = ""
    } catch (error) {
      // Handle the error if the request fails
      console.error("Error saving message:", error);
    }
  };
  
  /* get chat history from the backend */
  onMount(async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "http://localhost:8080/api/getMessage",
        {
          sender: currentUser.ID.toString(),
          recipient: currentChatUser.ID.toString(),
        },
        config // Move the config object to the correct position
      );

      // If the request is successful, you can proceed with updating the messages
      // const msgs = [...messages];
      // msgs.push({ fromSelf: true, message: formData.messageToSend });
      // messages = msgs;
      // formData.messageToSend = "";
    } catch (error) {
      // Handle the error if the request fails
      console.error("Error get message:", error);
    }
  })
</script>

<section class="static flex flex-col items-center h-full text-cc-400 dark:text-white">
  <!-- header -->
  <div class="py-4 leading-relaxed text-sky-700 text-center border-solid border-grey-100">
      <h1>{currentUser.firstname} {currentUser.lastname}</h1>
  </div>
  <!-- chat screen -->
  <div class="p-8 w-full flex flex-col flex-1 justify-center overflow-y-scroll bg-zinc-200">
    {#if messages?.length > 0}
      {#each messages as message}
        {#if message.sender}
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">{message.message}</p>
              </div>
              <Time timestamp="{new Date()}" format="dddd @ h:mm a" />
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
          {:else}
          <div class="flex w-full mt-2 space-x-3 max-w-xs justify-start">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">{message.message}</p>
              </div>
              <Time timestamp="{new Date()}" format="dddd @ h:mm a" />
            </div>
          </div>
        {/if}
      {/each}
    {:else}
      <div class="grid place-content-center flex-1 text-center space-y-2 px-8">
        <h1> 
            let's chat...
        </h1>
        <p>
          No messages yet. Start by sending a message
        </p>
      </div>
    {/if}
  </div>
    <!-- chat input -->
  <form
    on:submit|preventDefault={handleFormSubmit}
    class="absolute bottom-10 rounded-[20px] bg-white px-3 py-4 flex items-center w-[60%]"
  >
    <div class="icon-style">
      <EmojiMultiple />
    </div>
    <textarea
      name="message"
      bind:value={formData.content}
      placeholder="type you message here..."
      class="resize-y overflow-hidden h-auto input input-bordered bg-transparent w-full mx-2 text-cc-400 dark:text-white"
    />
    <button class="icon-style">
      <Send />
    </button>
  </form>
</section>
