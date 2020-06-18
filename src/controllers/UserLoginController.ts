import { BaseController } from './BaseController'
import { Request, Response, Next } from 'restify'
import { userImpl } from '../daos'
const { IUserRepo } = userImpl
type IUserRepo = typeof IUserRepo

export class UserLoginController extends BaseController {
    private userRepo: IUserRepo

    constructor(userRepo: IUserRepo) {
        super()
        this.userRepo = userRepo
    }

    protected async executeImpl(req: Request, res: Response): Promise<void | any> {
        try {
            // handle request
            console.log('loging in user')
            res.send(200, 'db response')
        } catch (err) {
            return this.fail(res, err.toString())
        }
    }
}
