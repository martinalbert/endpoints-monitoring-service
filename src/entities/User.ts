interface IUser {
    id: Number
    userName: string
    email: string
    accessToken: string
}

export default class User implements IUser {
    id: Number
    userName: string
    email: string
    accessToken: string

    constructor(id: Number, userName: string, email: string, accessToken: string) {
        this.id = id
        this.userName = userName
        this.email = email
        this.accessToken = accessToken
    }
}
