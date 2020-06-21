import loader from './loader'

export const UserRepo = loader.loadRepo('user')
export const MonitoredEndpointRepo = loader.loadRepo('monitoredEndpoint')
export const MonitoringResultRepo = loader.loadRepo('monitoringResult')

export const { mysql } = loader.loadClient()
export const { connect } = loader.loadClient()
