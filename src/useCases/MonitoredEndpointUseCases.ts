import {
    GetAllMonitoredEndpointsController,
    CreateMonitoredEndpointController,
    UpdateMonitoredEndpointController,
    DeleteMonitoredEndpointController,
    GetMonitoredEndpointByIDController,
} from '../controllers/MonitoredEndpointControllers'
import { monitoredEndpointImpl } from '../daos'
const { MonitoredEndpointRepo } = monitoredEndpointImpl

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
