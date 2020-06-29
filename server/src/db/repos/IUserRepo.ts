import User from '../../entities/User'

/**
 * Abstract Class\
 * Contains abstractions of all functions that communicate with database
 *
 * @abstract @class IUserRepo
 * @function register - Function that creates(register) new User
 * @function login - Function that logs in user which is authenticated
 * @function getCurrent - Function that finds user that is currently loged in
 * @function getAll - Function that finds all users
 * @function delete - Function that deletes user represented by his ID
 */
export default abstract class IUserRepo {
    /**
     * Function that creates(register) new User
     * @abstract @async @function register
     * @param {User} user - new User
     * @returns {Promise<User>} created User
     */
    abstract async register(user: User): Promise<User>
    /**
     * Function that logs in user which is authenticated
     * @abstract @async @function login
     * @param {string} email - User's email
     * @param {string} pw - User's password (AccessToken)
     * @returns {Promise<Object>} object with email and id of User
     */
    abstract async login(email: string, pw: string): Promise<object>
    /**
     * Function that finds user that is currently loged in
     * @abstract @async @function getCurrent
     * @param {number} id - User's ID
     * @param {string} email - User's email
     * @returns {Promise<User>} currently loged User
     */
    abstract async getCurrent(id: number, email: string): Promise<User>
    /**
     * Function that finds all users
     * @abstract @async @function getAll
     * @returns {Promise<User>} all users
     */
    abstract async getAll(): Promise<User[]>
    /**
     * Function that deletes user represented by his ID
     * @abstract @async @function delete
     * @param {number} id - ID of User
     * @returns {Promise<boolean>} value that indicates whether user was deleted or not
     */
    abstract async delete(id: number): Promise<boolean>
}
