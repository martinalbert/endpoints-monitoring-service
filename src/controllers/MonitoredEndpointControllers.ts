import { Request, Response, Next } from 'restify'
import { BaseController } from './BaseController'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import { IMonitoredEndpointRepo } from '../daos'
type IMonitoredEndpointRepo = typeof IMonitoredEndpointRepo

export class GetMonitoredEndpointByIDController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitored endpoint')
            res.send(200, 'db response')
            this.monitoredEndpointRepo.getByID(1)
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

export class GetAllMonitoredEndpointsController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitored endpoints')
            const all: MonitoredEndpoint[] = this.monitoredEndpointRepo.getAll()
            this.ok<MonitoredEndpoint[]>(res, all)
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

export class CreateMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('creating new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

export class UpdateMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('Updating new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}

export class DeleteMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('Deleting new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}
