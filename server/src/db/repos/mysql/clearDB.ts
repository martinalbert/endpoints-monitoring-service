import MonitoredEndpointRepo from './monitoredEndpoint_mysql_repo'
import UserRepo from './user_mysql_repo'

const userRepo = new UserRepo()
const endpointRepo = new MonitoredEndpointRepo()

/**
 * Function that finds all users and deletes all theirs endpoints and results.
 * @async @function clearDB
 */
const clearDB = async () => {
    const users = await userRepo.getAll()
    for (const user of users) {
        const endpoints = await endpointRepo.getAll(user.id)
        for (const endpoint of endpoints) {
            await endpointRepo.delete(endpoint.id, user.id)
        }
    }
}

export default clearDB
