import { json } from '@sveltejs/kit'

export const GET = () => {
    const message = 'Hello!'
    return json(message)
}