import {
    GetMonitoringResultByIDController,
    GetAllMonitoringResultsController,
    CreateMonitoringResultController,
    DeleteMonitoringResultController,
} from '../controllers/MonitoringResultControllers'
import { MonitoringResultRepo, MonitoredEndpointRepo, UserRepo } from '../db'

/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class MonitoringResultRepo
 * @instance
 */
const monitoringResultRepo = new MonitoringResultRepo()
/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class MonitoredEndpointRepo
 * @instance
 */
const monitoredEndpointRepo = new MonitoredEndpointRepo()

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:eID/results/:id
 *
 * @class GetMonitoringResultByIDController
 * @instance
 */
export const getResultByID = new GetMonitoringResultByIDController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:eID/results
 *
 * @class GetAllMonitoringResultsController
 * @instance
 */
export const getAllResults = new GetAllMonitoringResultsController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on endpoint /endpoints/:eID/results
 *
 * @class CreateMonitoringResultController
 * @instance
 */
export const createResult = new CreateMonitoringResultController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method DEL on endpoint /endpoints/:eID/results/:id
 *
 * @class DeleteMonitoringResultController
 * @instance
 */
export const deleteResult = new DeleteMonitoringResultController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
