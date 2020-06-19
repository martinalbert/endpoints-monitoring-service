import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

export default abstract class IMonitoredEndpointRepo {
    abstract getByID(id: Number): MonitoredEndpoint
    abstract getAll(): MonitoredEndpoint[]
    abstract create(monitoredEndpoint: MonitoredEndpoint): MonitoredEndpoint
    abstract update(monitoredEndpoint: MonitoredEndpoint): Boolean
    abstract delete(id: Number): Boolean
}
