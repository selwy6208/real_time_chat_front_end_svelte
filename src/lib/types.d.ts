interface User {
    ID: number
    firstname: string
    lastname: string
    email: string
    password: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string | null
}

interface Chat {
    id: number
    message: string
}

interface Message {
    id: number
    from: string
    to: string
    message: string
    isOnline: boolean
}