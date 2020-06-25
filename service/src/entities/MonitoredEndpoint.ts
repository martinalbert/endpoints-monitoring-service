import User from './User'

/**
 * Entity Class\
 * class that represent entity of monitored endpoint across application
 *
 * @class MonitoredEndpoint
 * @implements {IMonitoredEndpoint}
 * @param  {number} id - primary key of db record
 * @param  {string} name - name of endpoint
 * @param  {string} url - endpoint's URL
 * @param  {Date} dateOfCreation - date when was the endpoint created
 * @param  {Date} dateOfLastCheck - date when was the endpoint last checked
 * @param  {number} monitoredInterval - time interval how often is endpoint checked
 * @param  {User} owner - user instance of the owner of this endpoint
 * @function toObject - function that maps the monitored endpoint to object
 */
export default class MonitoredEndpoint implements IMonitoredEndpoint {
    id: number
    name: string
    url: string
    dateOfCreation: Date
    dateOfLastCheck: Date
    monitoredInterval: number
    owner: User

    constructor(
        id: number,
        name: string,
        url: string,
        dateOfCreation: Date,
        dateOfLastCheck: Date,
        monitoredInterval: number,
        owner: User
    ) {
        this.id = id
        this.name = name
        this.url = url
        this.dateOfCreation = dateOfCreation
        this.dateOfLastCheck = dateOfLastCheck
        this.monitoredInterval = monitoredInterval
        this.owner = owner
    }

    /**
     * Helper Function \
     * function that maps the monitored endpoint to bbject
     * @function toObject
     * @returns {Object} object with properties of endpoint
     */
    toObject(): Object {
        return {
            name: this.name,
            url: this.url,
            dateOfCreation: this.dateOfCreation,
            dateOfLastCheck: this.dateOfLastCheck,
            monitoredInterval: this.monitoredInterval,
            owner: this.owner.id,
        }
    }
}
