import IUserRepo from '../IUserRepo'
import User from '../../../entities/User'
import UserModel from './models/User'

export default class UserRepo extends IUserRepo {
    async getByID(id: number): Promise<User> {
        const user = await UserModel.findByPk(id)
        console.log(user.dataValues)

        if (user) return user

        throw new Error(`There is no user with id: ${id}.`)
    }
    async register(user: User): Promise<User> {
        const newUser = await UserModel.create(user.toObject())
        console.log(newUser.dataValues)

        if (newUser) return newUser

        throw new Error('Register process failed.')
    }

    async login(email: string, pw: string): Promise<object> {
        const found = await UserModel.findOne({ where: { email: email, accessToken: pw } })

        if (found)
            return {
                id: found.id,
                email,
            }

        throw new Error('Login process failed.')
    }
    async getCurrent(id: number, email: string): Promise<User> {
        const current = await UserModel.findOne({ where: { id: id, email: email } })

        if (current) return current

        throw new Error('User with this access token doesnt exist.')
    }

    async getAll(): Promise<User[]> {
        const users = await UserModel.findAll()
        console.log(users.dataValues)

        if (users) return users

        throw new Error(`There are no users.`)
    }
}
