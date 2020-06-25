import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

export default abstract class IMonitoredEndpointRepo {
    abstract async getByID(id: number, uID: number): Promise<MonitoredEndpoint>
    abstract async getAll(uID: number): Promise<MonitoredEndpoint[]>
    abstract async create(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint>
    abstract async update(id: number, monitoredEndpoint: MonitoredEndpoint): Promise<boolean>
    abstract async delete(id: number, uID: number): Promise<boolean>
}
