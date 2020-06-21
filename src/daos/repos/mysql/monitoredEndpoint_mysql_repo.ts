import IMonitoredEndpointRepo from '../IMonitoredEndpointRepo'
import MonitoredEndpointModel from './models/MonitoredEndpoint'
import MonitoringResultModel from './models/MonitoringResult'
import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'

export default class MonitoredEndpointRepo extends IMonitoredEndpointRepo {
    async getByID(id: number, uID: number): Promise<MonitoredEndpoint> {
        // make sure the owner is right
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: uID },
        })
        if (!endpoint) {
            throw new Error('This User doesnt have access to this endpoint')
        }
        console.log(endpoint.dataValues)

        if (endpoint) return endpoint

        throw new Error(`There is no monitored endpoint with id: ${id} for this User.`)
    }

    async getAll(uID: number): Promise<MonitoredEndpoint[]> {
        const endpoints = await MonitoredEndpointModel.findAll({
            where: { owner: uID },
        })

        if (endpoints) return endpoints

        throw new Error('There are no monitored endpoints for this User')
    }

    async create(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint> {
        const newEndpoint = await MonitoredEndpointModel.create(monitoredEndpoint.toObject())
        console.log(newEndpoint.dataValues)

        if (newEndpoint) return newEndpoint

        throw new Error('Creating new endpoint failed.')
    }

    async update(id: number, monitoredEndpoint: MonitoredEndpoint): Promise<boolean> {
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: monitoredEndpoint.owner.id },
        })

        if (endpoint) {
            return await MonitoredEndpointModel.update(monitoredEndpoint.toObject(), {
                where: { id: id },
            })
        }

        throw new Error(`There is no monitored endpoint with id: ${id} for this User`)
    }

    async delete(id: number, uID: number): Promise<boolean> {
        const endpoint = await MonitoredEndpointModel.findOne({
            where: { id: id, owner: uID },
        })
        if (!endpoint) {
            throw new Error('This User doesnt have access to this endpoint')
        }
        console.log(endpoint.dataValues)

        // delete all referenced monitoring results
        const results = await MonitoringResultModel.findAll({
            where: { monitoredEndpoint: id },
        })
        results.forEach(async (result: any) => {
            await MonitoringResultModel.destroy({
                where: {
                    id: result.id,
                },
            })
        })

        // delete referencing monitored enpoint
        if (endpoint.dataValues) {
            const deleted = await MonitoredEndpointModel.destroy({
                where: {
                    id: id,
                    owner: uID,
                },
            })
            return deleted
        }

        throw new Error(`There is no monitored endpoint with id: ${id} for this User`)
    }
}
