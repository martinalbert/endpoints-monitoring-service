import {
    GetAllMonitoredEndpointsController,
    CreateMonitoredEndpointController,
    UpdateMonitoredEndpointController,
    DeleteMonitoredEndpointController,
    GetMonitoredEndpointByIDController,
} from '../controllers/MonitoredEndpointControllers'
import { MonitoredEndpointRepo, UserRepo } from '../daos'

const monitoredEndpointRepo = new MonitoredEndpointRepo()
const userRepo = new UserRepo()

export const getMonitoredEndpointByID = new GetMonitoredEndpointByIDController(
    monitoredEndpointRepo
)
export const getAllMonitoredEndpoints = new GetAllMonitoredEndpointsController(
    monitoredEndpointRepo
)
export const createMonitoredEndpoint = new CreateMonitoredEndpointController(
    monitoredEndpointRepo,
    userRepo
)
export const updateMonitoredEndpoint = new UpdateMonitoredEndpointController(
    monitoredEndpointRepo
)
export const deleteMonitoredEndpoint = new DeleteMonitoredEndpointController(
    monitoredEndpointRepo
)
