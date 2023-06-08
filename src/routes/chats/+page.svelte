<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "$app/navigation";

    import Contacts from "./Contacts.svelte"
    import ChatContainer from "./ChatContainer.svelte"
    import Header from "./Header.svelte"
	import Welcome from "./Welcome.svelte";

    let contacts = []
    let currentChat: any
    let currentUser: any

    const handleChatChange = (chat: any) => {
        currentChat = chat
    }

    /* get user infors from the backend */
    onMount(async () => {
        const getContacts = async () => {
            const response = await fetch(`api/getuser`);
            const data = await response.json();
            contacts = data;
        };
        currentUser && getContacts()
    })

    /* If the user info is not exist, rediret to the home */
    onMount(async () => {
        const token = async () => {
            // localStorage.getItem("user")
            // ? 
            currentUser = localStorage.getItem("user")
            // : goto("/")
        }
        token()
    })
    
</script>

<div>
    <Header />
    <div class="grid grid-cols-4 h-auto bg-cc-100 dark:bg-neutral-900 ">
        <Contacts changeChat={handleChatChange} />
        <main class="col-span-3 lg:col-span-2 xl:col-span-3">
            <!-- {#if currentChat === undefined} 
                <Welcome username={currentUser?.username} />
            {:else}  -->
            <ChatContainer />
            <!-- {/if} -->
        </main>
    </div>
</div>