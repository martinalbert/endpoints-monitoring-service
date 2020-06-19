import {
    GetAllMonitoredEndpointsController,
    CreateMonitoredEndpointController,
    UpdateMonitoredEndpointController,
    DeleteMonitoredEndpointController,
    GetMonitoredEndpointByIDController,
} from '../controllers/MonitoredEndpointControllers'
import { MonitoredEndpointRepo } from '../daos'

const monitoredEndpointRepo = new MonitoredEndpointRepo()

export const getMonitoredEndpointByID = new GetMonitoredEndpointByIDController(
    monitoredEndpointRepo
)
export const getAllMonitoredEndpoints = new GetAllMonitoredEndpointsController(
    monitoredEndpointRepo
)
export const createMonitoredEndpoint = new CreateMonitoredEndpointController(
    monitoredEndpointRepo
)
export const updateMonitoredEndpoint = new UpdateMonitoredEndpointController(
    monitoredEndpointRepo
)
export const deleteMonitoredEndpoint = new DeleteMonitoredEndpointController(
    monitoredEndpointRepo
)
