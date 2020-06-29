import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import IMonitoringResultRepo from '../db/repos/IMonitoringResultRepo'
import IMonitoredEndpointRepo from '../db/repos/IMonitoredEndpointRepo'
import MonitoringResult from '../entities/MonitoringResult'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'

/**
 * Controller Class\
 * Entity: Monitoring Result\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:eID/results/:id
 *
 * @class GetMonitoringResultByIDController
 * @extends BaseController
 * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetMonitoringResultByIDController extends BaseController {
    /**
     * @private Database repository of Monitoring Results
     */
    private repo: IMonitoringResultRepo
    /**
     * @private Database repository of Monitored Endpoints
     */
    private endpointRepo: IMonitoredEndpointRepo

    /**
     * @constructor of GetMonitoringResultByIDController
     * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @returns {GetMonitoringResultByIDController} instance of this class
     */
    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitoring result npmby ID')
            const endpointID = req.params.eID
            const endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const result = await this.repo.getByID(req.params.id, endpoint)

            this.ok<MonitoringResult>(res, result)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitoring Result\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:eID/results
 *
 * @class GetAllMonitoringResultsController
 * @extends BaseController
 * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllMonitoringResultsController extends BaseController {
    /**
     * @private Database repository of Monitoring Results
     */
    private repo: IMonitoringResultRepo
    /**
     * @private Database repository of Monitored Endpoints
     */
    private endpointRepo: IMonitoredEndpointRepo

    /**
     * @constructor of GetAllMonitoringResultsController
     * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @returns {GetAllMonitoringResultsController} instance of this class
     */
    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitoring results')
            const endpointID = req.params.eID
            const endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const results = await this.repo.getLast10(endpoint)

            this.ok<MonitoringResult[]>(res, results)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitoring Result\
 * Controller that handles HTTP Requests with method POST on endpoint /endpoints/:eID/results
 *
 * @class CreateMonitoringResultController
 * @extends BaseController
 * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class CreateMonitoringResultController extends BaseController {
    /**
     * @private Database repository of Monitoring Results
     */
    private repo: IMonitoringResultRepo
    /**
     * @private Database repository of Monitored Endpoints
     */
    private endpointRepo: IMonitoredEndpointRepo

    /**
     * @constructor of CreateMonitoringResultController
     * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @returns {CreateMonitoringResultController} instance of this class
     */
    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // check for JSON
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            const dateOfCheck = new Date()
            const { httpCode, httpPayload } = req.body
            const endpointID = req.params.eID
            const monitoredEndpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
            const monitoringResult = new MonitoringResult(
                0,
                dateOfCheck,
                httpPayload,
                httpCode,
                monitoredEndpoint
            )

            // save record
            console.log(
                `creating new MonitoringResult: ${monitoredEndpoint.url} | ${httpCode}`
            )
            const newResult = await this.repo.create(monitoringResult)

            this.created<MonitoringResult>(res, newResult)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitoring Result\
 * Controller that handles HTTP Requests with method DEL on endpoint /endpoints/:eID/results/:id
 *
 * @class DeleteMonitoringResultController
 * @extends BaseController
 * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class DeleteMonitoringResultController extends BaseController {
    /**
     * @private Database repository of Monitoring Results
     */
    private repo: IMonitoringResultRepo
    /**
     * @private Database repository of Monitored Endpoints
     */
    private endpointRepo: IMonitoredEndpointRepo

    /**
     * @constructor of DeleteMonitoringResultController
     * @param  {IMonitoringResultRepo} monitoringResultRepo - Abstraction of database repository for Monitoring Results
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @returns {DeleteMonitoringResultController} instance of this class
     */
    constructor(
        monitoringResultRepo: IMonitoringResultRepo,
        monitoredEndpointRepo: IMonitoredEndpointRepo
    ) {
        super()
        this.repo = monitoringResultRepo
        this.endpointRepo = monitoredEndpointRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        let endpoint: MonitoredEndpoint
        try {
            const endpointID = req.params.eID
            endpoint = await this.endpointRepo.getByID(endpointID, req.user.id)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
        try {
            console.log('Deleting monitored endpoint')
            const deleted = await this.repo.delete(req.params.id, endpoint)
            this.ok<Boolean>(res, deleted)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
