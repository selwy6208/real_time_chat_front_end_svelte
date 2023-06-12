<script lang="ts">
  import { changeChat } from '$lib/store/contact.store'
  import Contact from './Contact.svelte'

  export let contacts: User[];
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

  let selectedChat: number;
  
  const changeCurrentChat = (contact: User, index: number) => {
    changeChat.set(contact)
    selectedChat = index
  }
</script>

<section class="bg-white text-cc-400 flex flex-col col-span-1 lg:col-span-2 xl:col-span-1 h-auto rounded-2xl">
  <div class="flex justify-center text-sm font-medium text-centerrounded-lg shadow sm:flex mb-3">
    <div class="inline-flex justify-center p-4 w-full border-b-2 border-transparent rounded-t-lg font-bold text-sky-600 hover:border-sky-300 group">
      <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-sky-600 dark:text-sky-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
      </svg>
        USERS
    </div>
  </div>
  <div class="space-y-2 py-0.5 flex-1 overflow-y-scroll">
    {#each contacts as contact, index}
      {#if contact.ID != currentUser.ID}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class={`relative flex items-center justify-center lg:justify-start hover:bg-sky-200 bg-gray-50 cursor-pointer lg:px-8 
            ${selectedChat === index && 'border-l-4 border-cc-400 bg-sky-200 dark:border-violet-600 dark:bg-sky-200 rounded-r-sm'}`}
            on:click={() => changeCurrentChat(contact, index)}
          >
            <Contact contact={contact} />
          </div>
        {/if}
    {/each}
  </div>
</section>