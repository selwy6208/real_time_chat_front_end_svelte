<script lang="ts">
  import axios from "axios"
  import Time from "svelte-time"
  
  import Send from "../../components/Send.svelte"
	import { changeChat } from "$lib/store/contact.store";

  export let socket: WebSocket
  export let currentUser: User = {
    ID: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    isOnline: false,
    unReadMessage: 0
  }

  export const onNewMessage  = (messageData: any) =>{
    console.log("New Message Arrives")
    const msgs = [...messages];
    msgs.push(messageData)
    messages = msgs
  }
  let currentChatUser: User = {
    ID: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    isOnline: false,
    unReadMessage: 0
  }
  let formData = {
    content: "",
    sender: `${currentUser.ID}`,
    recipient: `${currentChatUser.ID}`
  }

  changeChat.subscribe(value => {
      currentChatUser = value
      formData.recipient = `${value.ID}` // Update formData.recipient when currentChatUser changes
  })

  let messages: Message[] = []

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      console.log(formData.recipient, formData.sender, "address testing")
      if (formData.content) {
        const messageStr = JSON.stringify({message_type: "new_message", message_data: JSON.stringify(formData)})
        const msgs = [...messages];
        msgs.push({ sender: `${currentUser.ID}`, content: formData.content})
        messages = msgs
        formData.content = ""
        socket.send(messageStr)
      }
    }
  }

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault()
    console.log(formData.recipient, formData.sender, "address testing")
    if (formData.content) {
      const messageStr = JSON.stringify({message_type: "new_message", message_data: JSON.stringify(formData)})
      const msgs = [...messages];
      msgs.push({ sender: `${currentUser.ID}`, content: formData.content})
      messages = msgs
      formData.content = ""
      socket.send(messageStr)
    }
  }

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      if (currentChatUser.ID) {
        const response = await axios.post(
          "http://localhost:8080/api/getMessage",
          {
            chat_user_id: currentChatUser.ID
          },
          config 
        );
        const data = response.data.data
        messages = data
      }
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  }

  // Run fetchData when currentChatUser changes
  $: {
    if (currentChatUser.ID) {
      fetchData()
    }
  }
</script>

<section class="flex flex-col items-center h-full text-cc-400 dark:text-white bg-white rounded-2xl">
  <!-- header -->
  <div class="py-4 leading-relaxed text-sky-700 text-center font-bold text-2xl border-solid border-grey-100">
      <h1>{currentChatUser.firstname} {currentChatUser.lastname}</h1>
  </div>
  <!-- chat screen -->
  <div class="w-full h-[calc(100vh-265px)] overflow-auto px-20 bg-gray-100">
    {#if messages?.length > 0}
      {#each messages as message}
        {#if message.sender ==  `${currentChatUser.ID}`}
          <div class="flex w-full mt-2 space-x-3 max-w-xs justify-start">
            <div class="flex justify-center items-center flex-shrink-0 h-10 w-10 text-2xl font-bold text-white rounded-full bg-gray-400">
              {currentChatUser.firstname.charAt(0)}{currentChatUser.lastname.charAt(0)}
            </div>
            <div>
              <div class="bg-sky-300 p-3 rounded-r-lg rounded-bl-lg text-gray-700">
                <p class="text-sm">{message.content}</p>
              </div>
              <Time class="text-gray-500" timestamp="{new Date()}" format="dddd @ h:mm a" />
            </div>
          </div>
          {:else}
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-blue-400 p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">{message.content}</p>
              </div>
              <Time class="text-gray-500" timestamp="{new Date()}" format="dddd @ h:mm a" />
            </div>
            <div class="flex justify-center items-center flex-shrink-0 h-10 w-10 text-2xl font-bold text-white rounded-full bg-gray-400">
              {currentUser.firstname.charAt(0)}{currentUser.lastname.charAt(0)}
            </div>
          </div>
        {/if}
      {/each}
    {:else}
      <div class="grid place-content-center flex-1 text-center space-y-2 my-2.5 px-8 text-gray-700">
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
    class="absolute bottom-10 rounded-[20px] bg-gray-400 px-3 py-4 flex items-center w-[60%]"
  >
    <textarea
      name="message"
      bind:value={formData.content}
      on:keydown={handleKeyPress}
      placeholder="type you message here..."
      class="resize-y overflow-hidden h-auto input input-bordered bg-transpare w-full mx-2 text-gray-700 bg-white"
    />
    <button class="icon-style">
      <Send />
    </button>
  </form>
</section>
