import { Request, Response, Next } from 'restify'
import { BaseController } from './BaseController'
import IMonitoredEndpointRepo from '../db/repos/IMonitoredEndpointRepo'
import IUserRepo from '../db/repos/IUserRepo'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'

export class GetMonitoredEndpointByIDController extends BaseController {
    private repo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitored endpoint by ID')
            const endpoint = await this.repo.getByID(req.params.id, req.user.id)

            this.ok<MonitoredEndpoint>(res, endpoint)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

export class GetAllMonitoredEndpointsController extends BaseController {
    private repo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitored endpoints')
            const all = await this.repo.getAll(req.user.id)

            this.ok<MonitoredEndpoint[]>(res, all)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

export class CreateMonitoredEndpointController extends BaseController {
    private repo: IMonitoredEndpointRepo
    private userRepo: IUserRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo, userRepo: IUserRepo) {
        super()
        this.repo = monitoredEndpointRepo
        this.userRepo = userRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // check for JSON
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            // get User(UserRepo) specified in req.body
            const { id, email } = req.user
            const user = await this.userRepo.getCurrent(id, email)

            // create an ID, create dateOfCreation, create dateOfLastCheck
            const dateOfCreation = new Date()
            const dateOfLastCheck = new Date()
            const { name, url, monitoredInterval } = req.body
            const monitoredEndpoint = new MonitoredEndpoint(
                0,
                name,
                url,
                dateOfCreation,
                dateOfLastCheck,
                monitoredInterval,
                user
            )

            // save record
            console.log('creating new MonitoredEndpoint')
            const newEndpoint = await this.repo.create(monitoredEndpoint)

            this.created(res)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

export class UpdateMonitoredEndpointController extends BaseController {
    private repo: IMonitoredEndpointRepo
    private userRepo: IUserRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo, userRepo: IUserRepo) {
        super()
        this.repo = monitoredEndpointRepo
        this.userRepo = userRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // check for JSON
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            // get User(UserRepo) specified in req.body
            const { id, email } = req.user
            const user = await this.userRepo.getCurrent(id, email)

            // get last record of endpoint
            const oldEndpoint = await this.repo.getByID(req.params.id, id)

            // create dateOfCreation, create dateOfLastCheck
            const { name, url, monitoredInterval, lastCheck } = req.body
            const dateOfCreation = oldEndpoint.dateOfCreation
            const dateOfLastCheck = new Date(lastCheck)
            const monitoredEndpoint = new MonitoredEndpoint(
                0,
                name,
                url,
                dateOfCreation,
                dateOfLastCheck,
                monitoredInterval,
                user
            )

            // update record
            console.log('updating old monitored endpoint')
            const updated = await this.repo.update(req.params.id, monitoredEndpoint)

            this.ok<boolean>(res, updated)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

export class DeleteMonitoredEndpointController extends BaseController {
    private repo: IMonitoredEndpointRepo

    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // delete record
            console.log('Deleting monitored endpoint')
            const deleted = await this.repo.delete(req.params.id, req.user.id)

            this.ok<Boolean>(res, deleted)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}
