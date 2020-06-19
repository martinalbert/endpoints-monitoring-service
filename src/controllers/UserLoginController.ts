import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import { IUserRepo } from '../daos'
type IUserRepo = typeof IUserRepo

export class UserLoginController extends BaseController {
    private userRepo: IUserRepo

    constructor(userRepo: IUserRepo) {
        super()
        this.userRepo = userRepo
    }

    protected async executeImpl(
        req: Request,
        res: Response,
        next: Next
    ): Promise<void | any> {
        try {
            // handle request
            console.log('loging in user')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(next, err.toString())
        }
    }
}
