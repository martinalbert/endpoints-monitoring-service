import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../entities/User'

/**
 * HTTP Options \
 * Defines the options for axios request that returns all users.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - route after @property {string} baseURL
 * @property {string} baseURL - base route of URL
 * @property {object} headers - object representing headers in HTTP Request
 */
const options: AxiosRequestConfig = {
    method: 'get',
    url: '/users',
    baseURL: config.RESTAPI_URL,
    headers: {
        Authorization: undefined,
    },
}

/**
 * Helper Funtion \
 * Maps the received users from request to Entities of User
 * @function toArrayOfUsers
 * @param  {Array<any>} users - users from request
 * @returns {User[]} mapped users
 */
const toArrayOfUsers = (users: Array<any>): User[] => {
    let result: User[] = Array()

    if (users.length > 0)
        users.forEach((user: any) => {
            result.push(new User(user.id, user.userName, user.email, user.accessToken))
        })

    return result
}

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @returns {Promise<User|any>} returned users
 */
export default async (): Promise<User[] | any> => {
    let token: string
    try {
        const payload = { user: 'root' }
        token = jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: '15m',
        })
    } catch (error) {
        throw Error(error.stack)
    }

    options.headers.Authorization = `Bearer ${token}`

    let userObjects: AxiosResponse
    try {
        userObjects = await axios(options)
    } catch (error) {
        throw Error(error.stack)
    }

    return toArrayOfUsers(userObjects.data.dto)
}
