import async from 'async'
import { getUsers, login, getEndpoints } from './requests'
import monitorUrl from './monitorUrl'
import User from './entities/User'

/**
 * @constant
 * @type {number}
 * @default 60_000
 */
const MINUTE = 60_000
/**
 * Defines the interval time period.\
 * Can't exceed 15 minutes because user's tokens are valid just for 15 minutes.
 * @constant
 * @type {number}
 * @default 900_000
 */
const MINUTES_15 = MINUTE * 15 // cant be more than 15minutes - because of token

/**
 * Array of Users
 * @type {User[]} - Array of User Entity containing id, userName, email and accessToken
 */
let users: User[] = []
/**
 * Array of objects that reference User with MonitoredEndpoint
 * @interface IUserWithEndpointsArray - Interface for indexing those objects
 */
let usersWithEndpoints: IUserWithEndpointsArray = {}

/**
 * Asynchronous function to get all seeded users.\
 * This function is not called within main loop. Because there are not expected to be added new users.
 *
 * @async
 * @function prepareUsers
 * @returns {Promise<User[]>} Users array
 */
const prepareUsers = async () => {
    try {
        return (users = await getUsers())
    } catch (error) {
        throw Error(error.stack)
    }
}

/**
 * Asynchronous function that represent main process.\
 * It loops through Users and get their tokens and newest endpoints.\
 * Then it iterate through all endpoints executing @function monitorUrl. \
 * monitorUrl then sets the interval for monitoring and sends requests according to that interval.
 *
 * @async
 * @function process
 */
const process = async () => {
    // It loops through Users and get their tokens and newest endpoints.
    try {
        for (let user of users) {
            let token = await login(user)
            let monitoredEndpoints = await getEndpoints(token)

            // Fill the array of objects that reference User with MonitoredEndpoint.
            usersWithEndpoints[user.id] = {
                id: user.id,
                token: token,
                endpoints: monitoredEndpoints,
            }

            // Then it iterate through all endpoints executing function monitorUrl.
            async.map(
                usersWithEndpoints[user.id].endpoints,
                (endpoint, callback) => {
                    try {
                        // monitorUrl then sets the interval for monitoring and sends requests according to that interval.
                        monitorUrl(endpoint, usersWithEndpoints[user.id].token)
                        callback(null, 'OK')
                    } catch (error) {
                        callback(error)
                    }
                },
                (error, result) => {
                    if (error) throw Error(error.stack)
                    console.log(result)
                }
            )
        }
    } catch (error) {
        throw Error(error.stack)
    }
}

/**
 * Asynchronous function that launches main process.\
 * It prepares Users with @function prepareUsers \
 * Then it launches the main process by executing @function process \
 * and then it sets the interval for this function to repeat every 15 minutes.
 *
 * @async
 * @function main
 */
const main = async () => {
    await prepareUsers()
        .then(() => console.log('users are ready'))
        .catch(error => {
            throw Error(error.stack)
        })

    process().catch(error => {
        throw Error(error.stack)
    })

    setInterval(process, MINUTES_15)
}

/**
 * Execute the main function
 */
main().catch(console.trace)
