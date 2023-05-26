export interface User {
    id: string
    name: string,
    email: string,
    role: string
}

export type ContentData = {
    id: number,
    audio_url: string,
    title: string | null
    image: string | null
    source: string | null
    content: string | null
    content_url : string | null,
}