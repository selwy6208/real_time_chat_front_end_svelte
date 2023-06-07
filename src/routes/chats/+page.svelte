<script lang="ts">
    import Contacts from "./Contacts.svelte"
    import Welcome from "./Welcome.svelte"
    import ChatContainer from "./ChatContainer.svelte"
</script>

<div class="grid grid-cols-4 h-screen bg-cc-100 dark:bg-neutral-900 ">
    <Contacts />
    <main class="col-span-3 lg:col-span-2 xl:col-span-3">
        <ChatContainer />
    </main>
</div>