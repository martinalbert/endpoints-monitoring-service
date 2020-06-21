import { Request } from 'restify'

declare module 'restify' {
    export interface Request {
        user: {
            id: number
            email: string
        }
    }
}
