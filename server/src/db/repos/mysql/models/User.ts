import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../mysqlClient'

/**
 * Sequelize Model Class\
 * Entity: User\
 * Represent table in database
 *
 * @class UserModel
 * @extends Model
 */
class UserModel extends Model {}
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
            allowNull: true,
            validate: {
                len: [3, 50],
            },
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
            validate: {
                len: [10, 150],
            },
        },
    },
    {
        sequelize,
        modelName: 'user',
    }
)

export default UserModel
