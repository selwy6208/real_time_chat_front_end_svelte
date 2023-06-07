<script lang="ts">
    import SignOut from './SignOut.svelte';
    import Contact from './Contact.svelte';
    import Theme from '../../components/Theme.svelte';
</script>
  
  <section class="bg-slate-100 shadow shadow-slate-500/40 text-cc-400 flex flex-col col-span-1 lg:col-span-2 xl:col-span-1 h-screen">
    <div class="shadow shadow-blue-500/40">
      <ul
        class="flex list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist"
      >
        <li role="presentation">
          <a
            href="#tabs-home0"
            class="block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-home0"
            data-te-nav-active
            role="tab"
            aria-controls="tabs-home0"
            aria-selected="true"
          >CHATS</a>
        </li>
        <li role="presentation">
          <a
            href="#tabs-profile0"
            class="focus:border-transparen block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-profile0"
            role="tab"
            aria-controls="tabs-profile0"
            aria-selected="false"
          >USERS</a>
        </li>
      </ul>
    </div>
    <div class="flex items-center justify-center lg:justify-start space-x-4 hover:bg-cc-100 dark:hover:bg-neutral-900 cursor-pointer lg:px-8 py-4">
      <Contact />
    </div>
  </section>
