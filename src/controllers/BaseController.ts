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

    // 4XX
    public clientError(next: Next, message?: string) {
        return next(new errors.BadRequestError(message ? message : 'Bad Request Error'))
    }

    public invalidContent(next: Next, message?: string) {
        return next(
            new errors.InvalidContentError(message ? message : 'Invalid content Error')
        )
    }

    public requestExpired(next: Next, message?: string) {
        return next(
            new errors.RequestExpiredError(message ? message : 'Request expired error')
        )
    }

    public unauthorized(next: Next, message?: string) {
        return next(new errors.UnauthorizedError(message ? message : 'Unauthorized'))
    }

    public paymentRequired(next: Next, message?: string) {
        return next(
            new errors.PaymentRequiredError(message ? message : 'Payment required')
        )
    }

    public forbidden(next: Next, message?: string) {
        return next(new errors.ForbiddenError(message ? message : 'Forbidden'))
    }

    public notFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Not found'))
    }

    public resourceNotFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Resource not found'))
    }

    public conflict(next: Next, message?: string) {
        return next(new errors.ConflictError(message ? message : 'Conflict'))
    }

    public tooMany(next: Next, message?: string) {
        return next(
            new errors.TooManyRequestsError(message ? message : 'Too many requests')
        )
    }

    // 50X
    public notImplemented(next: Next, message?: string) {
        return next(
            new errors.NotImplementedError(message ? message : 'Not implemented error')
        )
    }

    public badGateway(next: Next, message?: string) {
        return next(new errors.BadGatewayError(message ? message : 'Bad gateway error'))
    }

    public serviceUnavailable(next: Next, message?: string) {
        return next(
            new errors.ServiceUnavailableError(
                message ? message : 'Service unavailable error'
            )
        )
    }

    public fail(next: Next, error: Error | string) {
        console.log(error)
        return next(new errors.InternalServerError(error))
    }
}
