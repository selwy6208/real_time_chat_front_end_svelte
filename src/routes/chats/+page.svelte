<script lang="ts">
    import axios from "axios"
    import { onMount } from "svelte"
    
    import { goto } from "$app/navigation"
	import { changeChat } from "$lib/store/contact.store"

    import Contacts from "./Contacts.svelte"
    import ChatContainer from "./ChatContainer.svelte"
    import Header from "./Header.svelte"
    import Welcome from "./Welcome.svelte"
    
    let socket: any
    let currentChatUser: User // Use the Chat type and set it as undefined initially
    let chatContainer: ChatContainer;
    let contacts: User[] = [] // Initialize contacts as an empty array
    let currentUser: User // Use the User type and set it as undefined initially

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
            socket.send(JSON.stringify({message_type: "new_connection", message_data: `${currentUser.ID}`}))
        };
        socket.onmessage = (data: any) => {
            const incomingMessage = JSON.parse(data.data)
            if (incomingMessage.message_type == 'new_connection'){
                const newConnectUserID = incomingMessage.message_data
                let isNewRegisteredUser = true
                contacts.forEach((contact, index) => {
                    if(`${contact.ID}` == newConnectUserID){
                        contacts[index].isOnline = true
                        isNewRegisteredUser = false
                    }
                });
                if(isNewRegisteredUser){
                    fetchUserDetails(newConnectUserID)
                    
                }
            }
            else if(incomingMessage.message_type == 'online_users'){
                if(incomingMessage.message_data !== undefined){
                    var onlineUsers = incomingMessage.message_data.split(',')
                    onlineUsers.forEach((user: any) => {
                        contacts.forEach((contact, index) => {
                            if(`${contact.ID}` == user){
                                contacts[index].isOnline = true
                            }
                        })
                    })
                }
            }
            else if(incomingMessage.message_type == 'close_connection'){
                const newConnectUserID = incomingMessage.message_data
                
            }
            else if(incomingMessage.message_type == 'new_message'){
                const messageData = JSON.parse(incomingMessage.message_data)
                if(messageData.sender == `${currentChatUser.ID}`){
                    if(chatContainer)
                        chatContainer.onNewMessage(messageData)
                }
                else{
                    contacts.forEach((contact, index) =>{
                        if(`${contact.ID}` == messageData.sender){
                            console.log("Increase unread message")
                            contacts[index].unReadMessage = (contacts[index].unReadMessage ?? 0) + 1
                        }
                    })
                }
                
            }
        }

        socket.onerror = (error: any) => {
            console.error("WebSocket error:", error);
        }
        socket.onclose = (event: any) => {
            console.log("WebSocket connection closed with code:", event.code)
        }
    }
    const fetchUserDetails  = async (newConnectUserID: string) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const response = await axios.get("http://localhost:8080/api/getUserDetails?userID=" + newConnectUserID, config)

            if (response.status === 200) {
                const data = response.data.data
                contacts.push(data)
            } else {
                // Request failed
                console.error('Error:', response.statusText)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
</script>

<Header />
<div class="grid grid-cols-4 h-[calc(100vh-65px)] bg-white">
    <Contacts contacts={contacts} currentUser={currentUser} />
    <main class="col-span-3 lg:col-span-2 xl:col-span-3">
        {#if !currentChatUser.ID } 
            <Welcome firstName={currentUser?.firstname} lastName={currentUser?.lastname} />
        {:else} 
        <ChatContainer bind:this = {chatContainer} currentUser={currentUser} currentChatUser={currentChatUser} socket = {socket} />
        {/if}
    </main>
</div>