import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

export default abstract class IMonitoredEndpointRepo {
    abstract async getByID(id: Number): Promise<MonitoredEndpoint>
    abstract async getAll(): Promise<MonitoredEndpoint[]>
    abstract async create(
        monitoredEndpoint: MonitoredEndpoint
    ): Promise<MonitoredEndpoint>
    abstract async update(
        id: Number,
        monitoredEndpoint: MonitoredEndpoint
    ): Promise<boolean>
    abstract async delete(id: Number): Promise<boolean>
}
