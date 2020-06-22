import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

export abstract class BaseController {
    protected abstract executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any>

    public async exec(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            await this.executeImpl(req, res, next)
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`)
            console.log(err)
            this.fail(next, 'An unexpected error occured')
        }
    }

    public ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            res.contentType = 'application/json'
            res.statusCode = 200
            return res.json({ dto })
        } else {
            return res.send(200)
        }
    }

    public created(res: Response) {
        return res.send(201)
    }

    // 400
    public clientError(next: Next, message?: string) {
        return next(new errors.BadRequestError(message ? message : 'Bad Request Error'))
    }

    // 400
    public invalidContent(next: Next, message?: string) {
        return next(
            new errors.InvalidContentError(message ? message : 'Invalid content Error')
        )
    }

    // 400
    public requestExpired(next: Next, message?: string) {
        return next(
            new errors.RequestExpiredError(message ? message : 'Request expired error')
        )
    }

    // 401
    public unauthorized(next: Next, message?: string) {
        return next(new errors.UnauthorizedError(message ? message : 'Unauthorized'))
    }

    // 402
    public paymentRequired(next: Next, message?: string) {
        return next(new errors.PaymentRequiredError(message ? message : 'Payment required'))
    }

    // 403
    public forbidden(next: Next, message?: string) {
        return next(new errors.ForbiddenError(message ? message : 'Forbidden'))
    }

    // 404
    public notFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Not found'))
    }

    // 404
    public resourceNotFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Resource not found'))
    }

    // 409
    public conflict(next: Next, message?: string) {
        return next(new errors.ConflictError(message ? message : 'Conflict'))
    }

    // 429
    public tooMany(next: Next, message?: string) {
        return next(new errors.TooManyRequestsError(message ? message : 'Too many requests'))
    }

    // 500
    public fail(next: Next, error: Error | string) {
        console.log(error)
        return next(new errors.InternalServerError(error))
    }

    // 501
    public notImplemented(next: Next, message?: string) {
        return next(
            new errors.NotImplementedError(message ? message : 'Not implemented error')
        )
    }

    // 502
    public badGateway(next: Next, message?: string) {
        return next(new errors.BadGatewayError(message ? message : 'Bad gateway error'))
    }

    // 503
    public serviceUnavailable(next: Next, message?: string) {
        return next(
            new errors.ServiceUnavailableError(message ? message : 'Service unavailable error')
        )
    }
}
