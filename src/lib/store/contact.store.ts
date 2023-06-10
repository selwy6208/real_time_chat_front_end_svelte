import { writable, type Writable } from "svelte/store"

export const changeChat: Writable<User> = writable({
    ID: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: ""
})
