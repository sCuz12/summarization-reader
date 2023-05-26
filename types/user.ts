export interface User {
    id: string
    name: string,
    email: string,
    role: string
}

export type ContentData = {
    audio_url: string,
    title: string
    image: string
    source: string
    content: string
    content_url : string,
}