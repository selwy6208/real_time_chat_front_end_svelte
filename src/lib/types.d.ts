interface User {
    ID: number
    firstname: string
    lastname: string
    email: string
    password: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null,
    isOnline: boolean,
    unReadMessage: number
}

interface Chat {
    id: number
    message: string
}

interface Message {
    sender: string
    content: string
}