import { QueryTypes } from 'sequelize'
import sequelize from '../../../sequelize'
import { MonitoredEndpointRepo, UserRepo } from '../../../../db'

/**
 * Function that finds all users and deletes all theirs endpoints and results.
 * @async @function clearDB
 */
export const clearDB = async () => {
    const userRepo = new UserRepo()
    const endpointRepo = new MonitoredEndpointRepo()

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
 * Function that gets the last ID of users, monitoredEndpoints and monitoringResults.
 *
 * @async @function getLastID
 * @return {Object} object with user last ID and endpoint last ID
 */
export const getLastID = async () => {
    const endpointCount = await sequelize.query(
        'SELECT MAX(id) AS count FROM monitoredEndpoints;',
        {
            type: QueryTypes.SELECT,
        }
    )
    const resultCount = await sequelize.query(
        'SELECT MAX(id) AS count FROM monitoringResults;',
        {
            type: QueryTypes.SELECT,
        }
    )
    const userCount = await sequelize.query('SELECT MAX(id) AS count FROM users;', {
        type: QueryTypes.SELECT,
    })

    return {
        userCount: userCount[0].count,
        endpointCount: endpointCount[0].count,
        resultCount: resultCount[0].count,
    }
}
