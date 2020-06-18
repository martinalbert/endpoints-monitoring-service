import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import { monitoringResultImpl } from '../daos'
const { IMonitoringResultRepo } = monitoringResultImpl
type IMonitoringResultRepo = typeof IMonitoringResultRepo

export class GetMonitoringResultByIDController extends BaseController {
    private monitoringResultRepo: IMonitoringResultRepo

    constructor(monitoringResultRepo: IMonitoringResultRepo) {
        super()
        this.monitoringResultRepo = monitoringResultRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('getting monitoring result')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class GetAllMonitoringResultsController extends BaseController {
    private monitoringResultRepo: IMonitoringResultRepo

    constructor(monitoringResultRepo: IMonitoringResultRepo) {
        super()
        this.monitoringResultRepo = monitoringResultRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('getting all monitoring Results')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class CreateMonitoringResultController extends BaseController {
    private monitoringResultRepo: IMonitoringResultRepo

    constructor(monitoringResultRepo: IMonitoringResultRepo) {
        super()
        this.monitoringResultRepo = monitoringResultRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('creating new monitoring Result')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class UpdateMonitoringResultController extends BaseController {
    private monitoringResultRepo: IMonitoringResultRepo

    constructor(monitoringResultRepo: IMonitoringResultRepo) {
        super()
        this.monitoringResultRepo = monitoringResultRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('Updating new monitoring Result')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}

export class DeleteMonitoringResultController extends BaseController {
    private monitoringResultRepo: IMonitoringResultRepo

    constructor(monitoringResultRepo: IMonitoringResultRepo) {
        super()
        this.monitoringResultRepo = monitoringResultRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('Deleting new monitoring Result')
            res.send(200, 'db response')

            // save record
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}
