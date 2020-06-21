import IMonitoringResultRepo from '../IMonitoringResultRepo'
import MonitoringResult from '../../../entities/MonitoringResult'
import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'
import MonitoringResultModel from './models/MonitoringResult'

export default class MonitoringResultRepo extends IMonitoringResultRepo {
    async getByID(id: number, endpoint: MonitoredEndpoint): Promise<MonitoringResult> {
        // endpoint authentication with user was done before in Endpoint Model
        // just authenticate the result with endpoint
        const result = await MonitoringResultModel.findOne({
            where: { id: id, monitoredEndpoint: endpoint.id },
        })
        console.log(result.dataValues)

        if (result) return result

        throw new Error(`There is no monitoring result with id: ${id} for this Endpoint.`)
    }

    async getAll(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]> {
        const results = await MonitoringResultModel.findAll({
            where: { monitoredEndpoint: endpoint.id },
        })

        if (results) return results

        throw new Error(`There are no monitoring results for this Endpoint.`)
    }

    async getLast10(endpoint: MonitoredEndpoint): Promise<MonitoringResult[]> {
        const results = await MonitoringResultModel.findAndCountAll({
            where: { monitoredEndpoint: endpoint.id },
            limit: 10,
        })

        if (results) return results

        throw new Error(`There is no monitoring results for this Endpoint.`)
    }

    async create(monitoringResult: MonitoringResult): Promise<MonitoringResult> {
        const newResult = await MonitoringResultModel.create(monitoringResult.toObject())
        console.log(newResult.dataValues)

        if (newResult) return newResult

        throw new Error('Creating new result failed.')
    }

    async delete(id: number, endpoint: MonitoredEndpoint): Promise<boolean> {
        const result = await MonitoringResultModel.findOne({
            where: { id: id, monitoredEndpoint: endpoint.id },
        })
        console.log(result.dataValues)

        if (result) {
            const deleted = await MonitoringResultModel.destroy({
                where: {
                    id: id,
                    monitoredEndpoint: endpoint.id,
                },
            })
            return deleted
        }

        throw new Error(`There is no monitoring result with id: ${id} for this Endpoint`)
    }
}
