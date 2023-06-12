<script lang="ts">
	import { onMount } from "svelte"
  import { goto } from "$app/navigation"
  import logo from "$lib/assets/logo.png"

  import SignOut from "./SignOut.svelte"

  let socket: WebSocket | null = null;

  const initializeSocket = () => {
    socket = new WebSocket("ws://localhost:8080/api/ws");

    socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket connection closed with code:", event.code);
    }
  }

  const signOut = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close()
    }

    localStorage.clear()
    goto("/login");
  }

  // Initialize the socket when the component is mounted
  onMount(initializeSocket);
</script>
<header>
    <!-- Navigation bar -->
    <nav
      class="relative flex w-full items-center justify-between dark:bg-sky-500/100 py-2 px-10 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
      data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="flex items-center">
          <!-- Hamburger menu button -->
          <img alt="The project logo" src={logo} />
        </div>
        <!-- Navigation links -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="hidden md:block cursor-pointer" on:click={() => signOut()}>
            <SignOut />
        </div>
      </div>
    </nav>
</header>