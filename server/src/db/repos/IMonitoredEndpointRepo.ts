import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

/**
 * Abstract Class\
 * Contains abstractions of all functions that communicate with database
 *
 * @abstract @class IMonitoredEndpointRepo
 * @function getByID - Function that finds one endpoint represented by its its ID
 * @function getAll - Function that finds all endpoints corresponding to its owner
 * @function create - Function that creates new endpoint corresponding to endpoint passed in
 * @function update - Function that updates old endpoint corresponding to endpoint passed in
 * @function delete - Function that deletes endpoint represented by its ID
 */
export default abstract class IMonitoredEndpointRepo {
    /**
     * Function that finds one endpoint represented by its its ID
     * @abstract @async @function getByID
     * @param {number} id - ID of Endpoint
     * @param {number} userID - ID of User
     * @returns {Promise<MonitoredEndpoint>} found Monitored Endpoint
     */
    abstract async getByID(id: number, userID: number): Promise<MonitoredEndpoint>
    /**
     * Function that finds all endpoints corresponding to its owner
     * @abstract @async @function getAll
     * @param {number} userID - ID of User
     * @returns {Promise<MonitoredEndpoint[]>} found Monitored Endpoints
     */
    abstract async getAll(userID: number): Promise<MonitoredEndpoint[]>
    /**
     * Function that creates new endpoint corresponding to endpoint passed in
     * @abstract @async @function create
     * @param {MonitoredEndpoint} monitoredEndpoint - endpoint that is going to be created
     * @returns {Promise<MonitoredEndpoint>} created Monitored Endpoint
     */
    abstract async create(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint>
    /**
     * Function that updates old endpoint corresponding to endpoint passed in
     * @abstract @async @function update
     * @param {number} id - ID of Endpoint
     * @param {MonitoredEndpoint} monitoredEndpoint - endpoint that is going to be updated
     * @returns {Promise<boolean>} value that indicates whether endpoint was updated or not
     */
    abstract async update(id: number, monitoredEndpoint: MonitoredEndpoint): Promise<boolean>
    /**
     * Function that deletes endpoint represented by its ID
     * @abstract @async @function delete
     * @param {number} id - ID of Endpoint
     * @param {number} userID - ID of User
     * @returns {Promise<boolean>} value that indicates whether endpoint was deleted or not
     */
    abstract async delete(id: number, userID: number): Promise<boolean>
}
