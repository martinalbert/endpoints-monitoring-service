import MonitoringResult from '../../entities/MonitoringResult'
import MonitoredEndpoint from '../../entities/MonitoredEndpoint'

export default abstract class IMonitoringResultRepo {
    abstract async getByID(id: Number, endpoint: MonitoredEndpoint): Promise<MonitoringResult>
    abstract async getLast10(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]>
    abstract async getAll(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]>
    abstract async create(monitoringResult: MonitoringResult): Promise<MonitoringResult>
    abstract async delete(id: Number, endpoint: MonitoredEndpoint): Promise<boolean>
}
