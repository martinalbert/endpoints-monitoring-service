import { Request, Response } from 'restify'
import errors from 'restify-errors'

export abstract class BaseController {
    protected abstract executeImpl(req: Request, res: Response): Promise<void | any>

    public async exec(req: Request, res: Response): Promise<void | any> {
        try {
            await this.executeImpl(req, res)
        } catch (err) {
            console.log(`[BaseController]: Uncaught controller error`)
            console.log(err)
            this.fail(res, 'An unexpected error occured')
        }
    }

    public static jsonResponse(res: Response, code: number, message: string) {
        res.statusCode = code
        return res.json({ message })
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

    public clientError(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized')
    }

    public unauthorized(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized')
    }

    public paymentRequired(res: Response, message?: string) {
        return BaseController.jsonResponse(
            res,
            402,
            message ? message : 'Payment required'
        )
    }

    public forbidden(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden')
    }

    public notFound(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found')
    }

    public conflict(res: Response, message?: string) {
        return BaseController.jsonResponse(res, 409, message ? message : 'Conflict')
    }

    public tooMany(res: Response, message?: string) {
        return BaseController.jsonResponse(
            res,
            429,
            message ? message : 'Too many requests'
        )
    }

    public todo(res: Response) {
        return BaseController.jsonResponse(res, 400, 'TODO')
    }

    public fail(res: Response, error: Error | string) {
        console.log(error)
        res.statusCode = 500
        return res.json({
            message: error.toString(),
        })
    }
}
