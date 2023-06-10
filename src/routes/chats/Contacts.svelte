<script lang="ts">
  import SignOut from './SignOut.svelte';
  import Contact from './Contact.svelte';

  export let changeChat: Function;
  export let contacts: User[];

  let selectedChat: number;

  const changeCurrentChat = (contact: User, index: number) => {
    changeChat(contact);
    selectedChat = index;
  };
</script>

<section class="bg-slate-100 shadow shadow-slate-500/40 text-cc-400 flex flex-col col-span-1 lg:col-span-2 xl:col-span-1 h-auto">
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li class="w-full">
            <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-sky-300 group">
              <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>  
                CHATS
            </a>
        </li>
        <li class="w-full">
            <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-sky-300 group">
              <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                USERS
            </a>
        </li>
    </ul>
  </div>
  <div class="space-y-2 py-0.5 lg:py-4 flex-1 overflow-y-scroll">
    {#each contacts as contact, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class={`flex items-center justify-center lg:justify-start hover:bg-cc-100 bg-gray-200 cursor-pointer lg:px-8 
        ${selectedChat === index && 'border-l-4 border-cc-400 bg-sky-200 dark:border-violet-600 dark:bg-neutral-900 rounded-r-sm'}`}
        on:click={() => changeCurrentChat(contact, index)}
      >
        <Contact contact={contact} />
      </div>
    {/each}
  </div>
</section>