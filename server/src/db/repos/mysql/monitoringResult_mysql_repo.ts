import IMonitoringResultRepo from '../IMonitoringResultRepo'
import { getLastID } from './actions'
import MonitoringResult from '../../../entities/MonitoringResult'
import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'
import MonitoringResultModel from './models/MonitoringResult'

/**
 * Repository Class\
 * Entity: Monitoring Result\
 * Class that handles communication with database
 *
 * @class MonitoringResultRepo
 * @extends IMonitoringResultRepo
 * @function getByID - Function that finds one result represented by its ID
 * @function getLast10 - Function that finds last 10 results corresponding to endpoint that is being monitored
 * @function getAll - Function that finds all results corresponding to endpoint that is being monitored
 * @function create - Function that creates new result corresponding to result passed in
 * @function delete - Function that deletes result represented by its its ID
 */
export default class MonitoringResultRepo extends IMonitoringResultRepo {
    /**
     * Function that finds one result represented by its ID
     * @async @function getByID
     * @param {number} id - ID of Result
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult>} found Monitoring Result
     */
    async getByID(id: number, endpoint: MonitoredEndpoint): Promise<MonitoringResult> {
        const result = await MonitoringResultModel.findOne({
            where: { id: id, monitoredEndpoint: endpoint.id },
        })

        if (result) return result

        throw new Error(`There is no monitoring result with id: ${id} for this Endpoint.`)
    }

    /**
     * Function that finds last 10 results corresponding to endpoint that is being monitored
     * @async @function getLast10
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult[]>} found Monitoring Results
     */
    async getLast10(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]> {
        const results = await MonitoringResultModel.findAll({
            where: { monitoredEndpoint: endpoint.id },
            order: [['id', 'DESC']],
            limit: 10,
        })

        if (results) return results

        throw new Error(`There is no monitoring results for this Endpoint.`)
    }

    /**
     * Function that finds all results corresponding to endpoint that is being monitored
     * @async @function getAll
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult[]>} found Monitoring Results
     */
    async getAll(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]> {
        const results = await MonitoringResultModel.findAll({
            where: { monitoredEndpoint: endpoint.id },
        })

        if (results) return results

        throw new Error(`There are no monitoring results for this Endpoint.`)
    }

    /**
     * Function that creates new result corresponding to result passed in
     * @async @function create
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult>} created Monitoring Result
     */
    async create(monitoringResult: MonitoringResult): Promise<MonitoringResult> {
        const { resultCount } = await getLastID()
        monitoringResult.id = resultCount + 1

        const newResult = await MonitoringResultModel.create(monitoringResult.toObject())

        if (newResult) return newResult

        throw new Error('Creating new result failed.')
    }

    /**
     * Function that deletes result represented by its its ID
     * @async @function delete
     * @param {number} id - ID of Result
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<boolean>} value that indicates whether result was deleted or not
     */
    async delete(id: number, endpoint: MonitoredEndpoint): Promise<boolean> {
        const result = await MonitoringResultModel.findOne({
            where: { id: id, monitoredEndpoint: endpoint.id },
        })

        if (result) {
            const deleted = await MonitoringResultModel.destroy({
                where: {
                    id: id,
                    monitoredEndpoint: endpoint.id,
                },
            })
            return deleted
        }

        throw new Error(`There is no monitoring result with id: ${id} for this Endpoint`)
    }
}
