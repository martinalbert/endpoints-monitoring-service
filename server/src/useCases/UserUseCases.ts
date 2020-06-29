import {
    UserRegisterController,
    UserLoginController,
    GetAllUsersController,
} from '../controllers/UserController'
import { UserRepo } from '../db'

/**
 * Instance of Repository Class\
 * Class that handles communication with database
 *
 * @class UserRepo
 * @instance
 */
const userRepo = new UserRepo()

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on endpoint /user/register
 *
 * @class UserRegisterController
 * @instance
 */
export const register = new UserRegisterController(userRepo)

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method POST on endpoint /user/login
 *
 * @class UserLoginController
 * @instance
 */
export const login = new UserLoginController(userRepo)

/**
 * Instance of Controller Class\
 * Controller that handles HTTP Requests with method GET on endpoint /users
 *
 * @class GetAllUsersController
 * @instance
 */
export const getAllUsers = new GetAllUsersController(userRepo)
