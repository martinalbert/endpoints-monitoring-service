import {
    GetMonitoredEndpointByIDController,
    GetAllMonitoredEndpointsController,
    CreateMonitoredEndpointController,
    UpdateMonitoredEndpointController,
    DeleteMonitoredEndpointController,
} from '../controllers/MonitoredEndpointControllers'
import { MonitoredEndpointRepo, UserRepo } from '../db'

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
    monitoredEndpointRepo,
    userRepo
)
export const deleteMonitoredEndpoint = new DeleteMonitoredEndpointController(
    monitoredEndpointRepo
)
