<script lang="ts">
  import { onMount } from "svelte"
  import axios from "axios"

  import Contact from "./Contact.svelte"
  import EmojiMultiple from "../../components/EmojiMultiple.svelte"
  import Send from "../../components/Send.svelte"

  export let currentUser:User
  export let currentChat:Chat

  let messages: any[] = [
    {
      fromSelf: "abcd",
      message: "Hello, how are you?"
    },
    {
      fromSelf: "ABCD",
      message: "Hello, Nice to meet you!"
    }
  ]

  let formData = {
    messageToSend: "aa"
  }

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    await axios.post("api/sendMessage", {
      from: currentUser?.id,
      to: currentChat?.id,
      message: formData.messageToSend,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: formData.messageToSend });
    messages = msgs;
    formData.messageToSend = "";
  };
  
  /* get chat history from the backend */
  onMount(async () => {
    const getMessages = async () => {
      const response = await fetch(`api/getMessages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: currentUser.id,
          to: currentChat.id
        })
      });
      const data = await response.json();
      messages = data;
    };

    await getMessages();
  });
</script>

<section class="static flex flex-col h-full text-cc-400 dark:text-white">
  <!-- header -->
  <div class="py-4 leading-relaxed text-sky-700 text-center border-solid border-grey-100">
      <h1>{currentUser?.userName}</h1>
  </div>
  <!-- chat screen -->
  <div class="p-8 flex-1 h-auto overflow-y-scroll space-y-2 bg-zinc-200">
    {#if messages?.length > 0}
      {#each messages as message}
        <div
          class={`flex ${
            message.fromSelf ? `justify-end` : `justify-start`
          }`}
        >
          <div class="flex flex-col items-end leading-relaxed space-y-2">
            <div
              class={`max-w-4xl px-4 py-2 rounded-sm dark:text-white ${
                message.fromSelf
                  ? `bg-cc-200 dark:bg-neutral-800`
                  : `bg-cc-400 text-cc-100 dark:bg-violet-600 `
              }`}>
              <h2>{message.message}</h2>
            </div>
            <span class="text-xs text-cc-400 dark:text-gray-400">
              <!-- {format(message.createdAt)}
               ref={scrollRef}
                key={uuidv4()} -->
            </span>
          </div>
        </div>
      {/each}
    {:else}
      <div class="grid place-content-center h-[38rem] text-center space-y-2 px-8">
        <h1> 
            <!-- {currentUser?.username},  -->
            let's chat...
        </h1>
        <p>
          No messages yet. Start by sending a message
            <!-- {currentChat?.username} -->
        </p>
      </div>
    {/if}

    <!-- chat input -->
    <form
      on:submit={handleFormSubmit}
      class="absolute bottom-0 rounded-[20px] bg-white px-3 py-4 flex items-center sticky"
    >
      <div class="icon-style">
        <EmojiMultiple />
      </div>
      <textarea
        name="message"
        bind:value={formData.messageToSend}
        placeholder="type you message here..."
        class="input input-bordered bg-transparent w-full mx-2 text-cc-400 dark:text-white"
      />
      <button class="icon-style">
        <Send />
      </button>
    </form>
  </div>
  
</section>
