import { Request, Response, Next } from 'restify'
import { BaseController } from './BaseController'
import IMonitoredEndpointRepo from '../db/repos/IMonitoredEndpointRepo'
import IUserRepo from '../db/repos/IUserRepo'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import User from 'src/entities/User'

/**
 * Controller Class\
 * Entity: Monitored Endpoint\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/:id
 *
 * @class GetMonitoredEndpointByIDController
 * @extends BaseController
 * @param  {IMonitoredEndpointRepo} repo - Database repository of Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetMonitoredEndpointByIDController extends BaseController {
    /**
     * @private Abstraction of database repository
     */
    private repo: IMonitoredEndpointRepo

    /**
     * @constructor of GetMonitoredEndpointByIDController
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Database repository of Monitored Endpoints
     * @returns {GetMonitoredEndpointByIDController} instance of this class
     */
    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
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
            console.log('getting monitored endpoint by ID')
            const endpoint = await this.repo.getByID(req.params.id, req.user.id)

            this.ok<MonitoredEndpoint>(res, endpoint)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitored Endpoint\
 * Controller that handles HTTP Requests with method GET on endpoint /endpoints/
 *
 * @class GetAllMonitoredEndpointsController
 * @extends BaseController
 * @param  {IMonitoredEndpointRepo} repo - Database repository of Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllMonitoredEndpointsController extends BaseController {
    /**
     * @private Abstraction of database repository
     */
    private repo: IMonitoredEndpointRepo

    /**
     * @constructor of GetAllMonitoredEndpointsController
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Database repository of Monitored Endpoints
     * @returns {GetAllMonitoredEndpointsController} instance of this class
     */
    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
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
            console.log('getting all monitored endpoints')
            const all = await this.repo.getAll(req.user.id)

            this.ok<MonitoredEndpoint[]>(res, all)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitored Endpoint\
 * Controller that handles HTTP Requests with method POST on endpoint /endpoints/
 *
 * @class CreateMonitoredEndpointController
 * @extends BaseController
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class CreateMonitoredEndpointController extends BaseController {
    /**
     * @private Database repository of Monitored Endpoints
     */
    private repo: IMonitoredEndpointRepo

    /**
     * @private Database repository of Users
     */
    private userRepo: IUserRepo

    /**
     * @constructor of CreateMonitoredEndpointController
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {CreateMonitoredEndpointController} instance of this class
     */
    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo, userRepo: IUserRepo) {
        super()
        this.repo = monitoredEndpointRepo
        this.userRepo = userRepo
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

            this.created<MonitoredEndpoint>(res, newEndpoint)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitored Endpoint\
 * Controller that handles HTTP Requests with method PUT on endpoint /endpoints/:id
 *
 * @class UpdateMonitoredEndpointController
 * @extends BaseController
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UpdateMonitoredEndpointController extends BaseController {
    /**
     * @private Database repository of Monitored Endpoints
     */
    private repo: IMonitoredEndpointRepo

    /**
     * @private Database repository of Users
     */
    private userRepo: IUserRepo

    /**
     * @constructor of UpdateMonitoredEndpointController
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UpdateMonitoredEndpointController} instance of this class
     */
    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo, userRepo: IUserRepo) {
        super()
        this.repo = monitoredEndpointRepo
        this.userRepo = userRepo
    }

    /**
     * Function that handles the requests.
     * @protected @async @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        let oldEndpoint: MonitoredEndpoint, user: User
        try {
            // check for JSON
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            const { id, email } = req.user
            user = await this.userRepo.getCurrent(id, email)

            // get last record of endpoint
            oldEndpoint = await this.repo.getByID(req.params.id, id)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
        try {
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
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: Monitored Endpoint\
 * Controller that handles HTTP Requests with method DEL on endpoint /endpoints/:id
 *
 * @class DeleteMonitoredEndpointController
 * @extends BaseController
 * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class DeleteMonitoredEndpointController extends BaseController {
    /**
     * @private Database repository of Monitored Endpoints
     */
    private repo: IMonitoredEndpointRepo

    /**
     * @constructor of DeleteMonitoredEndpointController
     * @param  {IMonitoredEndpointRepo} monitoredEndpointRepo - Abstraction of database repository for Monitored Endpoints
     * @returns {DeleteMonitoredEndpointController} instance of this class
     */
    constructor(monitoredEndpointRepo: IMonitoredEndpointRepo) {
        super()
        this.repo = monitoredEndpointRepo
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
            await this.repo.getByID(req.params.id, req.user.id)
        } catch (err) {
            return this.resourceNotFound(next, err)
        }
        try {
            // delete record
            console.log('Deleting monitored endpoint')
            const deleted = await this.repo.delete(req.params.id, req.user.id)

            this.ok<Boolean>(res, deleted)
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
