import data from '../../sampleData'
import sequelize from '../../sequelize'
import { getLastID } from './actions'
import MonitoredEndpointRepo from './monitoredEndpoint_mysql_repo'
import UserRepo from './user_mysql_repo'

const userRepo = new UserRepo()
const endpointRepo = new MonitoredEndpointRepo()

const users = data.users
const endpoints = data.endpoints

// /**
//  * Helper Function\
//  * Function that counts records of users and endpoints.
//  *
//  * @async @function numberOfRecords
//  * @return {Object} object with user count and endpoint count
//  */
// const numberOfRecords = async () => {
//     const users = await userRepo.getAll()
//     const userCount = users.length
//     let endpointCount = 0
//     for (const user of users) {
//         const endpoints = await endpointRepo.getAll(user.id)
//         endpointCount += endpoints.length
//     }
//     return {
//         userCount,
//         endpointCount,
//     }
// }

const seedUsers = async (): Promise<void> => {
    for (const user of users) await userRepo.register(user)
}

const seedEndpoints = async (): Promise<void> => {
    for (const endpoint of endpoints) await endpointRepo.create(endpoint)
}

/**
 * Function that seed base two Users Applifting and Batman\
 * and base few endpoints that can be monitored.
 * @async @function seed
 * @returns {Promise<void>} promise
 */
const seed = async (): Promise<void> => {
    try {
        const { userCount, endpointCount } = await getLastID()

        // seed users
        if (userCount < users.length) await seedUsers()

        // seed endpoints to monitor
        if (endpointCount < endpoints.length) await seedEndpoints()
    } catch (error) {
        throw Error(error)
    }
}

export default seed
