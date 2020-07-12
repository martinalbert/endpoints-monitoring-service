import { QueryTypes } from 'sequelize'
import sequelize from '../../../sequelize'
import { MonitoredEndpointRepo, UserRepo } from '../../../../db'

const userRepo = new UserRepo()
const endpointRepo = new MonitoredEndpointRepo()

/**
 * Function that finds all users and deletes all theirs endpoints and results.
 * @async @function clearDB
 */
export const clearDB = async () => {
    const users = await userRepo.getAll()
    for (const user of users) {
        const endpoints = await endpointRepo.getAll(user.id)
        for (const endpoint of endpoints) {
            await endpointRepo.delete(endpoint.id, user.id)
        }
    }
}

/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const dropAllTables = () => {
    sequelize.sync({ force: true })
}

/**
 * Helper Function\
 * Function that gets the last ID of users and monitoredEndpoints.
 *
 * @async @function getLastID
 * @return {Object} object with user last ID and endpoint last ID
 */
export const getLastID = async () => {
    const endpointCount = await sequelize.query(
        'SELECT setval(\'monitoredEndpoints_id_seq\', (SELECT MAX(id) FROM "monitoredEndpoints"));',
        { type: QueryTypes.SELECT }
    )
    const userCount = await sequelize.query(
        'SELECT setval(\'users_id_seq\', (SELECT MAX(id) FROM "users"));',
        { type: QueryTypes.SELECT }
    )
    return {
        endpointCount: Number(endpointCount[0].setval),
        userCount: Number(userCount[0].setval),
    }
}
