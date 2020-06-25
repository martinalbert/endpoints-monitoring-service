import MonitoredEndpoint from './MonitoredEndpoint'

/**
 * Entity Class\
 * class that represent entity of monitoring result across application
 *
 * @class MonitoringResult
 * @implements {IMonitoringResult}
 * @param  {number} id - primary key of db record
 * @param  {Date} dateOfLastCheck - date when was the endpoint last checked
 * @param  {string} returnedPayload - HTTP Data returned from request to endpoint
 * @param  {number} returnedHTTPStatusCode - HTTP Status returned from request to endpoint
 * @param  {MonitoredEndpoint} monitoredEndpoint - endpoint being monitored
 * @function toObject - function that maps the monitoring result to object
 */
export default class MonitoringResult implements IMonitoringResult {
    id: number
    dateOfCheck: Date
    returnedPayload: string
    returnedHTTPStatusCode: number
    monitoredEndpoint: MonitoredEndpoint

    constructor(
        id: number,
        dateOfCheck: Date,
        returnedPayload: string,
        returnedHTTPStatusCode: number,
        monitoredEndpoint: MonitoredEndpoint
    ) {
        this.id = id
        this.dateOfCheck = dateOfCheck
        this.returnedPayload = returnedPayload
        this.returnedHTTPStatusCode = returnedHTTPStatusCode
        this.monitoredEndpoint = monitoredEndpoint
    }

    /**
     * Helper Function \
     * function that maps the monitoring result to bbject
     * @function toObject
     * @returns {Object} object with properties of result
     */
    toObject(): Object {
        return {
            dateOfCheck: this.dateOfCheck,
            returnedPayload: this.returnedPayload,
            returnedHTTPStatusCode: this.returnedHTTPStatusCode,
            monitoredEndpoint: this.monitoredEndpoint.id,
        }
    }
}
