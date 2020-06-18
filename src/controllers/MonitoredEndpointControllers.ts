import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import { IMonitoredEndpointRepo } from '../daos/repos/mysql/monitoredEndpointMysqlRepo'

export class GetMonitoredEndpointByIDController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitored endpoint')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class GetAllMonitoredEndpointsController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitored endpoints')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class CreateMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('creating new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class UpdateMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('Updating new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class DeleteMonitoredEndpointController extends BaseController {
    private monitoredEndpointRepo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.monitoredEndpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('Deleting new monitored endpoint')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}
