<script lang="ts">
	import axios from "axios"
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"

    import Contacts from "./Contacts.svelte"
    import ChatContainer from "./ChatContainer.svelte"
    import Header from "./Header.svelte"
	import Welcome from "./Welcome.svelte"
	import { faGlassMartiniAlt } from "@fortawesome/free-solid-svg-icons"

    let contacts: User[] = [
        {
            ID: 6,
            CreatedAt: "2023-06-09T12:08:39-07:00",
            UpdatedAt: "2023-06-09T12:08:39-07:00",
            DeletedAt: null,
            firstname: "ff",
            lastname: "ff",
            email: "sveltekit@gmail.com",
            password: ""
        },
    ]
    let currentChat: Chat
    let currentUser: User

    const handleChatChange = (chat: any) => {
        currentChat = chat
    }

    /* get user infors from the backend */
    // onMount(async () => {
    //     const token = localStorage.getItem("token")
    //     const getContacts = async () => {
    //         const config = {
    //             headers: {
    //                 Authorization: token ? `Bearer ${token}` : ""
    //             }
    //         }
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/user", config)

    //             if (response.status === 200) {
    //                 // Request was successful
    //                 const data = response.data
    //                 contacts = data
    //             } else {
    //                 // Request failed
    //                 console.error('Error:', response.statusText)
    //             }
    //         } catch (error) {
    //         console.error('Error:', error)
    //         }
    //     }

    //     currentUser && getContacts()
    // })

    /* If the user info is not exist, rediret to the home */
    onMount(async () => {
        const token = localStorage.getItem("token");
        (!token) && goto("/login");

        const getUser = async () => {
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ""
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
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
        getUser()
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