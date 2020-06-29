import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

/**
 * Abstract Class\
 * Wraps the base functionality of HTTP Controller.
 *
 * @abstract @class BaseController
 * @protected @abstract @function executeImpl - Function that handles the HTTP Requests.
 * @public @async @function exec - Function that calls the @function executeImpl.
 * @function ok - 200
 * @function created - 201
 * @function clientError - 400
 * @function invalidContent - 400
 * @function requestExpired - 400
 * @function unauthorized - 401
 * @function paymentRequired - 402
 * @function forbidden - 403
 * @function notFound - 404
 * @function resourceNotFound - 404
 * @function conflict - 409
 * @function tooMany - 429
 * @function fail - 500
 * @function notImplemented - 501
 * @function badGateway - 502
 * @function serviceUnavailable - 503
 */
export abstract class BaseController {
    /**
     * Function that handles the requests.
     * @function executeImpl
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    protected abstract executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any>

    /**
     * Main function that calls @function executeImpl to handle the HTTP Request
     * @async @function exec
     * @param  {Request} req - incoming HTTP Request
     * @param  {Response} res - HTTP Response
     * @param  {Next} next - Callback function
     */
    public async exec(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            await this.executeImpl(req, res, next)
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`)
            console.log(err)
            this.fail(next, 'An unexpected error occured')
        }
    }

    /**
     * 200 OK\
     * Function that indicates that the request has succeeded.
     * @function ok<T>
     * @param  {Response} res - HTTP Response
     * @param  {T} dto - (optional) Data Object that are send as json to response
     */
    public ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            res.contentType = 'application/json'
            res.statusCode = 200
            return res.json({ dto })
        } else {
            return res.send(200)
        }
    }

    /**
     * 201 Created\
     * Function that indicates that the request has succeeded and has
     * led to the creation of a resource.
     * @function created<T>
     * @param  {Response} res - HTTP Response
     * @param  {T} dto - (optional) Data Object that are send as json to response
     */
    public created<T>(res: Response, dto: T) {
        return res.json(201, { dto })
    }

    /**
     * 400 Bad Request\
     * Function that indicates that the server cannot or will not process
     * the request due to something that is perceived to be a client error.
     * @function clientError
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public clientError(next: Next, message?: string) {
        return next(new errors.BadRequestError(message ? message : 'Bad Request Error'))
    }

    /**
     * 400 Invalid Content\
     * Function that indicates that the server cannot or will not process
     * the request due to something that is perceived to be a client error.
     * @function invalidContent
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public invalidContent(next: Next, message?: string) {
        return next(
            new errors.InvalidContentError(message ? message : 'Invalid content Error')
        )
    }

    /**
     * 400 Request Expired\
     * Function that indicates that the server cannot or will not process
     * the request due to something that is perceived to be a client error.
     * @function requestExpired
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public requestExpired(next: Next, message?: string) {
        return next(
            new errors.RequestExpiredError(message ? message : 'Request expired error')
        )
    }

    /**
     * 401 Unauthorized\
     * Function that indicates that the request has not been applied because
     * it lacks valid authentication credentials for the target resource.
     * @function unauthorized
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public unauthorized(next: Next, message?: string) {
        return next(new errors.UnauthorizedError(message ? message : 'Unauthorized'))
    }

    /**
     * 402 Payment Required\
     * Function that indicates that the request can not be processed until the client makes a payment.
     * @function paymentRequired
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public paymentRequired(next: Next, message?: string) {
        return next(new errors.PaymentRequiredError(message ? message : 'Payment required'))
    }

    /**
     * 403 Forbidden\
     * Function that indicates that the server understood the request but refuses to authorize it.
     * @function forbidden
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public forbidden(next: Next, message?: string) {
        return next(new errors.ForbiddenError(message ? message : 'Forbidden'))
    }

    /**
     * 404 Not Found\
     * Function that indicates that the server can't find the requested resource.
     * @function notFound
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public notFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Not found'))
    }

    /**
     * 404 Resource Not Found\
     * Function that indicates that the server can't find the requested resource.
     * @function resourceNotFound
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public resourceNotFound(next: Next, message?: string) {
        return next(new errors.NotFoundError(message ? message : 'Resource not found'))
    }

    /**
     * 409 Conflict\
     * Function that indicates a request conflict with current state of the server.
     * @function conflict
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public conflict(next: Next, message?: string) {
        return next(new errors.ConflictError(message ? message : 'Conflict'))
    }

    /**
     * 429 Too Many Requests\
     * Function that indicates the user has sent too many requests in a given amount of time ("rate limiting").
     * @function tooMany
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public tooMany(next: Next, message?: string) {
        return next(new errors.TooManyRequestsError(message ? message : 'Too many requests'))
    }

    /**
     * 500 Internal Server Error\
     * Function that indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
     * @function fail
     * @param  {Next} next - Callback function
     * @param  {Error|string} error - (optional) Error or Message that will be passed into Restify Error.
     */
    public fail(next: Next, error: Error | string) {
        console.log(error)
        return next(new errors.InternalServerError(error))
    }

    /**
     * 501 Not Implemented\
     * Function that indicates that the server does not support the functionality required to fulfill the request.
     * @function notImplemented
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public notImplemented(next: Next, message?: string) {
        return next(
            new errors.NotImplementedError(message ? message : 'Not implemented error')
        )
    }

    /**
     * 502 Bad Gateway\
     * Function that indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server.
     * @function badGateway
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public badGateway(next: Next, message?: string) {
        return next(new errors.BadGatewayError(message ? message : 'Bad gateway error'))
    }

    /**
     * 503 Service Unavailable\
     * Function that indicates that the server is not ready to handle the request.
     * @function serviceUnavailable
     * @param  {Next} next - Callback function
     * @param  {String} message - (optional) Message that will be passed into Restify Error.
     */
    public serviceUnavailable(next: Next, message?: string) {
        return next(
            new errors.ServiceUnavailableError(message ? message : 'Service unavailable error')
        )
    }
}
