import MonitoringResult from '../../entities/MonitoringResult'
import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

/**
 * Abstract Class\
 * Contains abstractions of all functions that communicate with database
 *
 * @abstract @class IMonitoringResultRepo
 * @function getByID - Function that finds one result represented by its ID
 * @function getLast10 - Function that finds last 10 results corresponding to endpoint that is being monitored
 * @function getAll - Function that finds all results corresponding to endpoint that is being monitored
 * @function create - Function that creates new result corresponding to result passed in
 * @function delete - Function that deletes result represented by its its ID
 */
export default abstract class IMonitoringResultRepo {
    /**
     * Function that finds one result represented by its ID
     * @abstract @async @function getByID
     * @param {number} id - ID of Result
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult>} found Monitoring Result
     */
    abstract async getByID(id: Number, endpoint: MonitoredEndpoint): Promise<MonitoringResult>
    /**
     * Function that finds last 10 results corresponding to endpoint that is being monitored
     * @abstract @async @function getLast10
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult[]>} found Monitoring Results
     */
    abstract async getLast10(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]>
    /**
     * Function that finds all results corresponding to endpoint that is being monitored
     * @abstract @async @function getAll
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult[]>} found Monitoring Results
     */
    abstract async getAll(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]>
    /**
     * Function that creates new result corresponding to result passed in
     * @abstract @async @function create
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<MonitoringResult>} created Monitoring Result
     */
    abstract async create(monitoringResult: MonitoringResult): Promise<MonitoringResult>
    /**
     * Function that deletes result represented by its its ID
     * @abstract @async @function delete
     * @param {number} id - ID of Result
     * @param {MonitoredEndpoint} endpoint - endpoint that is being monitored
     * @returns {Promise<boolean>} value that indicates whether result was deleted or not
     */
    abstract async delete(id: Number, endpoint: MonitoredEndpoint): Promise<boolean>
}
