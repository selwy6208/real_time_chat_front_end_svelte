<script lang="ts">
    import axios from "axios"
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"

    import Contacts from "./Contacts.svelte"
    import ChatContainer from "./ChatContainer.svelte"
    import Header from "./Header.svelte"
    import Welcome from "./Welcome.svelte"

    let contacts: User[] = [] // Initialize contacts as an empty array
    let currentChat: Chat // Use the Chat type and set it as undefined initially
    let currentUser: User // Use the User type and set it as undefined initially

    const handleChatChange = (chat: Chat) => {
        currentChat = chat
    }

    /* get user info from the backend */
    onMount(async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            goto("/login")
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await axios.get("http://localhost:8080/api/getUsers", config)

                if (response.status === 200) {
                    // Request was successful
                    const data = response.data.data
                    contacts = data
                } else {
                    // Request failed
                    console.error('Error:', response.statusText)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    })

    /* If the user info does not exist, redirect to the login page */
    onMount(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            goto("/login");
        } else {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const response = await axios.get("http://localhost:8080/api/user", config)

                if (response.status === 200) {
                    // Request was successful
                    const data = response.data.data
                    currentUser = data
                } else {
                    // Request failed
                    console.error('Error:', response.statusText)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    })
</script>


<div>
    <Header />
    <div class="grid grid-cols-4 h-auto bg-cc-100 dark:bg-neutral-900 ">
        <Contacts changeChat={handleChatChange} contacts={contacts} />
        <main class="col-span-3 lg:col-span-2 xl:col-span-3">
            {#if currentChat === undefined} 
                <Welcome firstName={currentUser?.firstname} lastName={currentUser?.lastname} />
            {:else} 
            <ChatContainer currentUser={currentUser} currentChat={currentChat} />
            {/if}
        </main>
    </div>
</div>