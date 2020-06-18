import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'
import User from '../../../entities/User'

export interface IMonitoredEndpointRepo {
    getMonitoredEndpoint(id: Number): MonitoredEndpoint
    getAllMonitoredEndpoints(): MonitoredEndpoint[]
    createMonitoredEndpoint(monitoredEndpoint: MonitoredEndpoint): MonitoredEndpoint
    updateMonitoredEndpoint(monitoredEndpoint: MonitoredEndpoint): Boolean
    deleteMonitoredEndpoint(id: Number): Boolean
}

export class MonitoredEndpointRepo implements IMonitoredEndpointRepo {
    getMonitoredEndpoint(id: Number): MonitoredEndpoint {
        const owner = new User(1, 'Martin', 'martin@martin.com', 'salt')
        return new MonitoredEndpoint(
            id,
            'one',
            'http:/lorem.com/',
            new Date(),
            new Date(),
            10,
            owner
        )
    }
    getAllMonitoredEndpoints(): MonitoredEndpoint[] {
        const owner = new User(1, 'Martin', 'martin@martin.com', 'salt')
        return [
            new MonitoredEndpoint(
                1,
                'one',
                'http:/lorem.com/',
                new Date(),
                new Date(),
                10,
                owner
            ),
            new MonitoredEndpoint(
                2,
                'two',
                'http:/lorem.com/',
                new Date(),
                new Date(),
                10,
                owner
            ),
        ]
    }
    createMonitoredEndpoint(monitoredEndpoint: MonitoredEndpoint): MonitoredEndpoint {
        return monitoredEndpoint
    }
    updateMonitoredEndpoint(monitoredEndpoint: MonitoredEndpoint): Boolean {
        return false
    }
    deleteMonitoredEndpoint(id: Number): Boolean {
        return false
    }
}
