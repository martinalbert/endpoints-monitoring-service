import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../mysqlClient'
import UserModel from './User'

class MonitoredEndpointModel extends Model {}
MonitoredEndpointModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
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
