import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import User from '../entities/User'
import config from '../config'

/**
 * HTTP Options \
 * Defines the options for axios request that returns monitoring results.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - route after @property {string} baseURL
 * @property {string} baseURL - base route of URL
 * @property {object} headers - object representing headers in HTTP Request
 * @property {object} data - object representing body in HTTP Request
 */
const options: AxiosRequestConfig = {
    method: 'post',
    url: '/user/login',
    baseURL: config.RESTAPI_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    data: {
        email: '',
        pw: '',
    },
}
/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @param  {User} user - user that is going to be loged in
 * @returns {Promise<string | any>} token
 */
export default async (user: User): Promise<string | any> => {
    options.data.email = user.email
    options.data.pw = user.accessToken

    let token: AxiosResponse
    try {
        token = await axios(options)
    } catch (error) {
        throw new Error('Log In failed.')
    }

    return token.data.dto
}
