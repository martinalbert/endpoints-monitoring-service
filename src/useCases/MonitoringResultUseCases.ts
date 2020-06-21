import {
    GetMonitoringResultByIDController,
    GetAllMonitoringResultsController,
    CreateMonitoringResultController,
    DeleteMonitoringResultController,
} from '../controllers/MonitoringResultControllers'
import { MonitoringResultRepo, MonitoredEndpointRepo, UserRepo } from '../daos'

const monitoringResultRepo = new MonitoringResultRepo()
const monitoredEndpointRepo = new MonitoredEndpointRepo()

export const getMonitoringResultByID = new GetMonitoringResultByIDController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
export const getAllMonitoringResults = new GetAllMonitoringResultsController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
export const createMonitoringResult = new CreateMonitoringResultController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
export const deleteMonitoringResult = new DeleteMonitoringResultController(
    monitoringResultRepo,
    monitoredEndpointRepo
)
