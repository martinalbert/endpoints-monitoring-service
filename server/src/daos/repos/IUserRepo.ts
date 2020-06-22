import User from '../../entities/User'

export default abstract class IUserRepo {
    abstract async register(user: User): Promise<User>
    abstract async login(email: string, pw: string): Promise<object>
    abstract async getByID(id: number): Promise<User>
    abstract async getCurrent(id: number, email: string): Promise<User>
    abstract async getAll(): Promise<User[]>
    // abstract async update(id: Number, user: User): Promise<boolean>
    // abstract async delete(id: Number): Promise<boolean>
}
