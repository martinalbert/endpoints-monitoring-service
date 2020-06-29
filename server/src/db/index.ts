import loader from './loader'

/**
 * Repository Class\
 * Entity: User\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @extends IUserRepo
 * @function register - Function that creates(register) new User
 * @function login - Function that logs in user which is authenticated
 * @function getCurrent - Function that finds user that is currently loged in
 * @function getAll - Function that finds all users
 */
export const UserRepo = loader.loadRepo('user')

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
export const MonitoredEndpointRepo = loader.loadRepo('monitoredEndpoint')

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
export const MonitoringResultRepo = loader.loadRepo('monitoringResult')

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
export const { mysql } = loader.loadClient()
/**
 * Function that authenticate connection to database and synchronize tables.
 * @function connect
 */
export const { connect } = loader.loadClient()
/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const { dropAllTables } = loader.loadClient()
