export interface User {
    id: string
    name: string,
    email: string,
    role: string
}

export type ContentData = {
    content: string,
    audio_url: string,
}