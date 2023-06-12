<script lang="ts">
    import axios from "axios"
    import { onMount } from "svelte"
    import { goto } from "$app/navigation"

    import Contacts from "./Contacts.svelte"
    import ChatContainer from "./ChatContainer.svelte"
    import Header from "./Header.svelte"
    import Welcome from "./Welcome.svelte"
	import { changeChat } from "$lib/store/contact.store";

    let contacts: User[] = [] // Initialize contacts as an empty array
    export let currentChatUser: User // Use the Chat type and set it as undefined initially
    let currentUser: User // Use the User type and set it as undefined initially

    // const handleChatChange = (chat: Chat) => {
    //     currentChat = chat
    // }

    changeChat.subscribe(value => {
        currentChatUser = value
    })

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
    let socket: any
   
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

                    socketInitialize();
                } else {
                    // Request failed
                    console.error('Error:', response.statusText)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }
    })
    const socketInitialize = () =>{
        socket = new WebSocket("ws://localhost:8080/api/ws")
        socket.onopen = () => {
            console.log("WebSocket connection established!")
            console.log(currentUser.ID)
            socket.send(JSON.stringify({message_type: "new_connection", message_data: `${currentUser.ID}`}))
        };
        socket.onmessage = (data: any) => {
            console.log("Received message:", data);
        };

        socket.onerror = (error: any) => {
            console.error("WebSocket error:", error);
        }

        socket.onclose = (event: any) => {
            console.log("WebSocket connection closed with code:", event.code)
        }
    }
</script>

<Header />
<div class="grid grid-cols-4 h-[calc(100vh-65px)] bg-cc-100 dark:bg-neutral-900 ">
    <!-- <Contacts changeChat={handleChatChange} contacts={contacts} /> -->
    <Contacts contacts={contacts} />
    <main class="col-span-3 lg:col-span-2 xl:col-span-3">
        {#if !currentChatUser.ID } 
            <Welcome firstName={currentUser?.firstname} lastName={currentUser?.lastname} />
        {:else} 
        <ChatContainer currentUser={currentUser} currentChatUser={currentChatUser} socket = {socket} />
        {/if}
    </main>
</div>