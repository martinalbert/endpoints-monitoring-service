import IMonitoredEndpointRepo from '../IMonitoredEndpointRepo'
import MonitoredEndpoint from '../../../entities/MonitoredEndpoint'
import User from '../../../entities/User'

export default class MonitoredEndpointRepo extends IMonitoredEndpointRepo {
    getByID(id: Number): MonitoredEndpoint {
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

    getAll(): MonitoredEndpoint[] {
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

    create(monitoredEndpoint: MonitoredEndpoint): MonitoredEndpoint {
        return monitoredEndpoint
    }

    update(monitoredEndpoint: MonitoredEndpoint): Boolean {
        return false
    }

    delete(id: Number): Boolean {
        return false
    }
}
