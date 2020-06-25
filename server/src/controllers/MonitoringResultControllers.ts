import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import IMonitoringResultRepo from '../db/repos/IMonitoringResultRepo'
import IMonitoredEndpointRepo from '../db/repos/IMonitoredEndpointRepo'
import MonitoringResult from '../entities/MonitoringResult'

export class GetMonitoringResultByIDController extends BaseController {
    private repo: IMonitoringResultRepo
    private endpointRepo: IMonitoredEndpointRepo

    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitoring result npmby ID')
            const endpointID = req.params.eID
            const endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const result = await this.repo.getByID(req.params.id, endpoint)

            this.ok<MonitoringResult>(res, result)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

export class GetAllMonitoringResultsController extends BaseController {
    private repo: IMonitoringResultRepo
    private endpointRepo: IMonitoredEndpointRepo

    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitoring results')
            const endpointID = req.params.eID
            const endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const results = await this.repo.getLast10(endpoint)

            this.ok<MonitoringResult[]>(res, results)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

export class CreateMonitoringResultController extends BaseController {
    private repo: IMonitoringResultRepo
    private endpointRepo: IMonitoredEndpointRepo

    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // check for JSON
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            // create an ID, create dateOfCreation, create dateOfLastCheck
            const dateOfCheck = new Date()
            const { httpCode, httpPayload } = req.body
            const endpointID = req.params.eID
            const monitoredEndpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const monitoringResult = new MonitoringResult(
                0,
                dateOfCheck,
                httpPayload,
                Number(httpCode),
                monitoredEndpoint
            )

            // save record
            console.log('creating new MonitoringResult')
            const newResult = await this.repo.create(monitoringResult)

            this.created(res)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

export class DeleteMonitoringResultController extends BaseController {
    private repo: IMonitoringResultRepo
    private endpointRepo: IMonitoredEndpointRepo

    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // delete record
            console.log('Deleting monitored endpoint')
            const endpointID = req.params.eID
            const endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const deleted = await this.repo.delete(req.params.id, endpoint)

            this.ok<Boolean>(res, deleted)
            next()
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}
