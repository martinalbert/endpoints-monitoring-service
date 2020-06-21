interface IUser {
    id: number
    userName?: string
    email: string
    accessToken: string
    toObject(): Object
}

export default class User implements IUser {
    id: number
    userName?: string
    email: string
    accessToken: string

    constructor(id: number, userName: string, email: string, accessToken: string) {
        this.id = id
        this.userName = userName
        this.email = email
        this.accessToken = accessToken
    }

    toObject(): Object {
        return {
            id: this.id,
            userName: this.userName,
            email: this.email,
            accessToken: this.accessToken,
        }
    }
}
