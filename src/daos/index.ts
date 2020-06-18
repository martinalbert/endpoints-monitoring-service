import daoLoader from './daoLoader'

export const userImpl = daoLoader.loadDao('user')
export const monitoredEndpointImpl = daoLoader.loadDao('monitoredEndpoint')
export const monitoringResultImpl = daoLoader.loadDao('monitoringResult')
