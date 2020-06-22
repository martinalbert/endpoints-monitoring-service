import { Request, Response, Next } from 'restify'
import jwt from 'jsonwebtoken'
import config from '../config'
import { BaseController } from './BaseController'
import IUserRepo from '../daos/repos/IUserRepo'
import User from '../entities/User'

export class UserRegisterController extends BaseController {
    private repo: IUserRepo

    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            // implement bCrypt
            console.log('registering user')
            const { userName, email, pw } = req.body
            const user = new User(0, userName, email, pw)
            const newUser = await this.repo.register(user)

            this.created(res)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

export class UserLoginController extends BaseController {
    private repo: IUserRepo

    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
    }

    protected async executeImpl(req: Request, res: Response, next: Next): Promise<void | any> {
        try {
            // handle request
            console.log('loging in user')
            const { email, pw } = req.body

            // Create JWT
            const user = await this.repo.login(email, pw)
            const token = jwt.sign(user, config.JWT_SECRET, {
                expiresIn: '15m',
            })

            this.ok<string>(res, token)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
