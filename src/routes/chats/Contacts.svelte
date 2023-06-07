<script lang="ts">
    import SignOut from './SignOut.svelte';
    import Logo from './Logo.svelte';
    import Contact from './Contact.svelte';
    import Theme from '../../components/Theme.svelte';
</script>
  
  <section class="bg-cc-200 text-cc-400 dark:text-white dark:bg-neutral-800 flex flex-col col-span-1 lg:col-span-2 xl:col-span-1 h-screen">
    <div class="cursor-pointer">
      <Logo />
    </div>
    <div class="flex items-center justify-center lg:justify-between px-8 py-4 sticky bottom-0">
      <h1 class="hidden lg:block">Change mode</h1>
      <div class="icon-style active:rotate-180">
        <Theme />
      </div>
    </div>
    <h1 class="px-8 hidden lg:block">
      Select contact to start a conversation😀
    </h1>
    <div class="space-y-2 py-0.5 lg:py-4 flex-1 overflow-y-scroll">
      <div class="flex items-center justify-center lg:justify-start space-x-4 hover:bg-cc-100 dark:hover:bg-neutral-900 cursor-pointer lg:px-8 py-4">
        <Contact />
      </div>
    </div>
    <!-- current user -->
    <div class="flex items-center justify-center lg:justify-between px-8 py-4 sticky bottom-0">
      <div class="hidden lg:flex items-center space-x-4 cursor-pointer">
        <Contact />
      </div>
      <SignOut />
    </div>
  </section>
  
  <style>
    /* Add your custom styles here */
  </style>
  