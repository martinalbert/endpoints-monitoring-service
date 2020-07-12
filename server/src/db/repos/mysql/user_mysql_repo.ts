import IUserRepo from '../IUserRepo'
import { getLastID } from './actions'
import User from '../../../entities/User'
import UserModel from './models/User'

/**
 * Repository Class\
 * Entity: User\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @extends IUserRepo
 * @function register - Function that creates(register) new User
 * @function login - Function that logs in user which is authenticated
 * @function getCurrent - Function that finds user that is currently loged in
 * @function getAll - Function that finds all users
 * @function delete - Function that deletes user represented by his ID
 */
export default class UserRepo extends IUserRepo {
    /**
     * Function that creates(register) new User
     * @async @function register
     * @param {User} user - new User
     * @returns {Promise<User>} created User
     */
    async register(user: User): Promise<User> {
        const { userCount } = await getLastID()
        user.id = userCount + 1

        const newUser = await UserModel.create(user.toObject())

        if (newUser) return newUser

        throw new Error('Register process failed.')
    }

    /**
     * Function that logs in user which is authenticated
     * @async @function login
     * @param {string} email - User's email
     * @param {string} pw - User's password (AccessToken)
     * @returns {Promise<Object>} object with email and id of User
     */
    async login(email: string, pw: string): Promise<object> {
        const found = await UserModel.findOne({ where: { email: email, accessToken: pw } })

        if (found)
            return {
                id: found.id,
                email,
            }

        throw new Error('Login process failed.')
    }

    /**
     * Function that finds user that is currently loged in
     * @async @function getCurrent
     * @param {number} id - User's ID
     * @param {string} email - User's email
     * @returns {Promise<User>} currently loged User
     */
    async getCurrent(id: number, email: string): Promise<User> {
        const current = await UserModel.findOne({ where: { id: id, email: email } })

        if (current) return current

        throw new Error('User with this ID doesnt exist.')
    }

    /**
     * Function that finds all users
     * @async @function getAll
     * @returns {Promise<User>} all users
     */
    async getAll(): Promise<User[]> {
        const users = await UserModel.findAll()

        if (users) return users

        throw new Error(`There are no users.`)
    }

    /**
     * Function that deletes user represented by his ID
     * @async @function delete
     * @returns {Promise<boolean>} value that indicates whether user was deleted or not
     */
    async delete(id: number): Promise<boolean> {
        const result = await UserModel.findByPk(id)

        if (result) {
            return await UserModel.destroy({ where: { id: id } })
        }

        throw new Error(`There is no User with id: ${id}`)
    }
}
