/**
 * Interface\
 * Interface for Entity of User
 *
 * @interface
 * @param  {number} id - Primary key of DB record
 * @param  {string} userName - Name of User
 * @param  {string} email - Email of User
 * @param  {string} accessToken - Access token
 * @function toObject - Function that maps the user to object
 */
interface IUser {
    /**
     * Primary key of DB record
     */
    id: number
    /**
     * Name of User
     */
    userName?: string
    /**
     * Email of User
     */
    email: string
    /**
     * Access token
     */
    accessToken: string

    /**
     * Helper Function \
     * function that maps the user to bbject
     * @function toObject
     * @returns {Object} object with properties of user
     */
    toObject(): Object
}

/**
 * Interface\
 * Interface for Entity of Monitoring Result
 *
 * @interface
 * @param  {number} id - primary key of db record
 * @param  {Date} dateOfLastCheck - date when was the endpoint last checked
 * @param  {string} returnedPayload - HTTP Data returned from request to endpoint
 * @param  {number} returnedHTTPStatusCode - HTTP Status returned from request to endpoint
 * @param  {MonitoredEndpoint} monitoredEndpoint - endpoint being monitored
 * @function toObject - function that maps the monitoring result to object
 */
interface IMonitoringResult {
    /**
     * primary key of db record
     */
    id: number
    /**
     * date when was the endpoint last checked
     */
    dateOfCheck: Date
    /**
     * HTTP Data returned from request to endpoint
     */
    returnedPayload: string
    /**
     * HTTP Status returned from request to endpoint
     */
    returnedHTTPStatusCode: number
    /**
     * endpoint being monitored
     */
    monitoredEndpoint: MonitoredEndpoint
    /**
     * Helper Function \
     * function that maps the monitoring result to bbject
     * @function toObject
     * @returns {Object} object with properties of result
     */
    toObject(): Object
}

/**
 * Interface\
 * Interface for Entity of Monitored Endpoint
 *
 * @interface
 * @param  {number} id - primary key of db record
 * @param  {string} name - name of endpoint
 * @param  {string} url - endpoint's URL
 * @param  {Date} dateOfCreation - date when was the endpoint created
 * @param  {Date} dateOfLastCheck - date when was the endpoint last checked
 * @param  {number} monitoredInterval - time interval how often is endpoint checked
 * @param  {User} owner - user instance of the owner of this endpoint
 * @function toObject - function that maps the monitored endpoint to object
 */
interface IMonitoredEndpoint {
    /**
     * primary key of db record
     */
    id: number
    /**
     * name of endpoint
     */
    name: string
    /**
     * endpoint's URL
     */
    url: string
    /**
     * date when was the endpoint created
     */
    dateOfCreation: Date
    /**
     * date when was the endpoint last checked
     */
    dateOfLastCheck: Date
    /**
     * time interval how often is endpoint checked
     */
    monitoredInterval: number
    /**
     * user instance of the owner of this endpoint
     */
    owner: User
    /**
     * Helper Function \
     * function that maps the monitored endpoint to bbject
     * @function toObject
     * @returns {Object} object with properties of endpoint
     */
    toObject(): Object
}
