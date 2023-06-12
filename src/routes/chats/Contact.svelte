<script lang="ts">
    export let contact: User
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex py-2 items-center gap-10" on:click={() => contact.unReadMessage = 0}>
    <div class={`flex justify-center items-center flex-shrink-0 h-10 w-10 text-2xl font-bold text-white rounded-full ${contact.isOnline ? 'bg-sky-400' : 'bg-gray-400'}`}>
        {contact.firstname.charAt(0)}{contact.lastname.charAt(0)} 
    </div>
    <div class="hidden lg:block leading-relaxed">
        <p class="text-2xl font-medium text-gray-500">{contact.firstname} {contact.lastname}</p>
    </div>
    {#if contact.unReadMessage && contact.unReadMessage !== 0}
        <div class="absolute right-8 text-center bg-green-500 h-6 w-6 rounded-full text-white font-bold">
            {contact.unReadMessage}
        </div>
    {/if}
</div>
  