import { UserRegisterController, UserLoginController } from '../controllers/UserController'
import { UserRepo } from '../daos'

const userRepo = new UserRepo()

export const registerUser = new UserRegisterController(userRepo)
export const loginUser = new UserLoginController(userRepo)
