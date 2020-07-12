import Sequelize, { Model } from 'sequelize'
import sequelize from '../../../sequelize'
import UserModel from './User'

/**
 * Sequelize Model Class\
 * Entity: Monitored Endpoint\
 * Represent table in database
 *
 * @class MonitoredEndpointModel
 * @extends Model
 */
class MonitoredEndpointModel extends Model {}
MonitoredEndpointModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        dateOfCreation: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        dateOfLastCheck: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        monitoredInterval: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 5,
                isInt: true,
            },
        },
        owner: {
            type: Sequelize.INTEGER,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'monitoredEndpoint',
        timestamps: false,
    }
)

export default MonitoredEndpointModel
