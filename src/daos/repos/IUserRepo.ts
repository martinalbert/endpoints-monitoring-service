import User from '../../entities/User'

export default abstract class IUserRepo {
    abstract async getByID(id: number): Promise<User>
    abstract async getCurrent(accessToken: string): Promise<User>
    abstract async getAll(): Promise<User[]>
    abstract async register(user: User): Promise<User>
    abstract async login(user: User): Promise<User>
    abstract async update(id: Number, user: User): Promise<boolean>
    abstract async delete(id: Number): Promise<boolean>
}
