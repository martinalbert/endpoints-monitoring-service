/**
 * Entity Class\
 * class that represent entity of user across application
 *
 * @class User
 * @implements {IUser}
 * @param  {number} id - primary key of db record
 * @param  {string} userName - name of User
 * @param  {string} email - email of User
 * @param  {string} accessToken - access token
 * @function toObject - function that maps the user to object
 */
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

    /**
     * Helper Function \
     * function that maps the user to object
     * @function toObject
     * @returns {UserObject} object with properties of user
     */
    toObject(): UserObject {
        return {
            id: this.id,
            userName: this.userName,
            email: this.email,
            accessToken: this.accessToken,
        }
    }
}
