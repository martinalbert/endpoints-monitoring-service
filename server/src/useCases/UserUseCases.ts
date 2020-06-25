import {
    UserRegisterController,
    UserLoginController,
    GetAllUsersController,
} from '../controllers/UserController'
import { UserRepo } from '../db'

const userRepo = new UserRepo()

export const registerUser = new UserRegisterController(userRepo)
export const loginUser = new UserLoginController(userRepo)
export const getAllUsersController = new GetAllUsersController(userRepo)
