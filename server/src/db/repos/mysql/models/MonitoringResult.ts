import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../mysqlClient'
import MonitoredEndpointModel from './MonitoredEndpoint'

/**
 * Sequelize Model Class\
 * Entity: Monitoring Results\
 * Represent table in database
 *
 * @class MonitoringResultModel
 * @extends Model
 */
class MonitoringResultModel extends Model {}

MonitoringResultModel.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
            autoIncrement: true,
        },
        dateOfCheck: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        returnedPayload: {
            type: Sequelize.TEXT({ length: 'long' }),
            allowNull: false,
        },
        returnedHTTPStatusCode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
            },
        },
        monitoredEndpoint: {
            type: Sequelize.INTEGER,
            references: {
                model: MonitoredEndpointModel,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'monitoringResult',
    }
)

export default MonitoringResultModel
