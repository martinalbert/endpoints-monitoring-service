import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../mysqlClient'

class UserModel extends Model {
    get userName(): string {
        return this.userName
    }
    get accessToken(): string {
        return this.accessToken
    }
}
UserModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        accessToken: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
)

export default UserModel
