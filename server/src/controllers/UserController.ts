import { Request, Response, Next } from 'restify'
import jwt from 'jsonwebtoken'
import { BaseController } from './BaseController'
import config from '../config'
import IUserRepo from '../db/repos/IUserRepo'
import User from '../entities/User'

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method POST on endpoint /user/register
 *
 * @class UserRegisterController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UserRegisterController extends BaseController {
    /**
     * @private Abstraction of database repository
     */
    private repo: IUserRepo

    /**
     * @constructor of UserRegisterController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UserRegisterController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
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
            if (!req.is('application/json')) return this.invalidContent(next)

            // handle request
            console.log('registering user')
            const { userName, email, pw } = req.body

            // password is not encrypted because this controller serves
            // as a helper controller during development
            const user = new User(0, userName, email, pw)
            const newUser = await this.repo.register(user)

            this.created<User>(res, newUser)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method POST on endpoint /user/login
 *
 * @class UserLoginController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class UserLoginController extends BaseController {
    /**
     * @private Abstraction of database repository
     */
    private repo: IUserRepo

    /**
     * @constructor of UserLoginController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {UserLoginController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
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
            if (!req.is('application/json')) return this.invalidContent(next)

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

/**
 * Controller Class\
 * Entity: User\
 * Controller that handles HTTP Requests with method GET on endpoint /users
 *
 * @class GetAllUsersController
 * @extends BaseController
 * @param  {IUserRepo} repo - Database repository of Users
 * @protected @async @function executeImpl - Implementation of function that gets executed when handling request.
 */
export class GetAllUsersController extends BaseController {
    /**
     * @private Abstraction of database repository
     */
    private repo: IUserRepo

    /**
     * @constructor of GetAllUsersController
     * @param  {IUserRepo} userRepo - Abstraction of database repository for Users
     * @returns {GetAllUsersController} instance of this class
     */
    constructor(userRepo: IUserRepo) {
        super()
        this.repo = userRepo
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
            console.log('getting all users')
            const users = await this.repo.getAll()

            this.ok<User[]>(res, users)
            next()
        } catch (err) {
            return this.fail(next, err)
        }
    }
}
