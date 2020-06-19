import loader from './loader'

export const UserRepo = loader.loadRepo('user')
export const MonitoredEndpointRepo = loader.loadRepo('monitoredEndpoint')
export const MonitoringResultRepo = loader.loadRepo('monitoringResult')

export const IUserRepo = loader.loadInterface('User')
export const IMonitoredEndpointRepo = loader.loadInterface('MonitoredEndpoint')
export const IMonitoringResultRepo = loader.loadInterface('MonitoringResult')
