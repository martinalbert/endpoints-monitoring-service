import {
    GetMonitoredEndpointByIDController,
    GetAllMonitoredEndpointsController,
    CreateMonitoredEndpointController,
    UpdateMonitoredEndpointController,
    DeleteMonitoredEndpointController,
} from '../controllers/MonitoredEndpointControllers'
import { MonitoredEndpointRepo, UserRepo } from '../db'

/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class MonitoredEndpointRepo
 * @instance of MonitoredEndpointRepo
 */
const monitoredEndpointRepo = new MonitoredEndpointRepo()
/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @instance
 */
const userRepo = new UserRepo()

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:id
 *
 * @class GetMonitoredEndpointByIDController
 * @instance
 */
export const getEndpointByID = new GetMonitoredEndpointByIDController(monitoredEndpointRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints
 *
 * @class GetAllMonitoredEndpointsController
 * @instance
 */
export const getAllEndpoints = new GetAllMonitoredEndpointsController(monitoredEndpointRepo)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on endpoint /endpoints
 *
 * @class CreateMonitoredEndpointController
 * @instance
 */
export const createEndpoint = new CreateMonitoredEndpointController(
    monitoredEndpointRepo,
    userRepo
)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method PUT on endpoint /endpoints/:id
 *
 * @class UpdateMonitoredEndpointController
 * @instance
 */
export const updateEndpoint = new UpdateMonitoredEndpointController(
    monitoredEndpointRepo,
    userRepo
)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method DEL on endpoint /endpoints/:id
 *
 * @class DeleteMonitoredEndpointController
 * @instance
 */
export const deleteEndpoint = new DeleteMonitoredEndpointController(monitoredEndpointRepo)
