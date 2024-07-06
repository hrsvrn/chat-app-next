import {z} from 'zod'

export const addvalidator =z.object({
    email:z.string().email(),
})

