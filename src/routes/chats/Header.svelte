<script lang="ts">
	import SignOut from "./SignOut.svelte"
  import logo from "$lib/assets/logo.png"
</script>
<header>
    <!-- Navigation bar -->
    <nav
      class="relative flex w-full items-center justify-between bg-sky-500/100 py-2 px-10 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
      data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="flex items-center">
          <!-- Hamburger menu button -->
          <img alt="The project logo" src={logo} />
        </div>
        <!-- Navigation links -->
        <div class="hidden md:block">
            <SignOut />
        </div>
      </div>
    </nav>
</header>