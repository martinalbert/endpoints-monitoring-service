import IMonitoredEndpointRepo from '../IMonitoredEndpointRepo'
import { getLastID } from './actions'
import MonitoredEndpointModel from './models/MonitoredEndpoint'
import MonitoringResultModel from './models/MonitoringResult'
import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'

/**
 * Repository Class\
 * Entity: Monitored Endpoint\
 * Class that handles communication with database
 *
 * @class MonitoredEndpointRepo
 * @extends IMonitoredEndpointRepo
 * @function getByID - Function that finds one endpoint represented by its its ID
 * @function getAll - Function that finds all endpoints corresponding to its owner
 * @function create - Function that creates new endpoint corresponding to endpoint passed in
 * @function update - Function that updates old endpoint corresponding to endpoint passed in
 * @function delete - Function that deletes endpoint represented by its ID
 */
export default class MonitoredEndpointRepo extends IMonitoredEndpointRepo {
    /**
     * Function that finds one endpoint represented by its its ID
     * @async @function getByID
     * @param {number} id - ID of Endpoint
     * @param {number} uID - ID of User
     * @returns {Promise<MonitoredEndpoint>} found Monitored Endpoint
     */
    async getByID(id: number, uID: number): Promise<MonitoredEndpoint> {
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: uID },
        })
        if (!endpoint) {
            throw new Error('This User doesnt have access to this endpoint')
        }

        if (endpoint) return endpoint

        throw new Error(`There is no monitored endpoint with id: ${id} for this User.`)
    }

    /**
     * Function that finds all endpoints corresponding to its owner
     * @async @function getAll
     * @param {number} uID - ID of User
     * @returns {Promise<MonitoredEndpoint[]>} found Monitored Endpoints
     */
    async getAll(uID: number): Promise<MonitoredEndpoint[]> {
        const endpoints = await MonitoredEndpointModel.findAll({
            where: { owner: uID },
        })

        if (endpoints) return endpoints

        throw new Error('There are no monitored endpoints for this User')
    }

    /**
     * Function that creates new endpoint corresponding to endpoint passed in
     * @async @function create
     * @param {MonitoredEndpoint} monitoredEndpoint - endpoint that is going to be created
     * @returns {Promise<MonitoredEndpoint>} created Monitored Endpoint
     */
    async create(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint> {
        const { endpointCount } = await getLastID()
        monitoredEndpoint.id = endpointCount + 1

        const newEndpoint = await MonitoredEndpointModel.create(monitoredEndpoint.toObject())

        if (newEndpoint) return newEndpoint

        throw new Error('Creating new endpoint failed.')
    }

    /**
     * Function that updates old endpoint corresponding to endpoint passed in
     * @async @function update
     * @param {number} id - ID of Endpoint
     * @param {MonitoredEndpoint} monitoredEndpoint - endpoint that is going to be updated
     * @returns {Promise<boolean>} value that indicates whether endpoint was updated or not
     */
    async update(id: number, monitoredEndpoint: MonitoredEndpoint): Promise<boolean> {
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: monitoredEndpoint.owner.id },
        })

        if (endpoint) {
            return await MonitoredEndpointModel.update(monitoredEndpoint.toObjectWithoutID(), {
                where: { id: id },
            })
        }

        throw new Error(`There is no monitored endpoint with id: ${id} for this User`)
    }

    /**
     * Function that deletes endpoint represented by its ID
     * @async @function delete
     * @param {number} id - ID of Endpoint
     * @param {number} uID - ID of User
     * @returns {Promise<boolean>} value that indicates whether endpoint was deleted or not
     */
    async delete(id: number, uID: number): Promise<boolean> {
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: uID },
        })
        if (!endpoint) {
            throw new Error('This User doesnt have access to this endpoint')
        }

        // delete all referenced monitoring results
        const results = await MonitoringResultModel.findAll({
            where: { monitoredEndpoint: id },
        })
        if (results)
            results.forEach(async (result: any) => {
                await MonitoringResultModel.destroy({
                    where: {
                        id: result.id,
                    },
                })
            })

        // delete referencing monitored enpoint
        if (endpoint.dataValues) {
            const deleted = await MonitoredEndpointModel.destroy({
                where: {
                    id: id,
                    owner: uID,
                },
                restartIdentity: true,
            })
            return deleted
        }

        throw new Error(`There is no monitored endpoint with id: ${id} for this User`)
    }
}
