import Sequelize, { Model } from 'sequelize'
import { sequelize } from '../mysqlClient'
import MonitoredEndpointModel from './MonitoredEndpoint'

class MonitoringResultModel extends Model {
    get returnedPayload(): string {
        return this.returnedPayload
    }
    get returnedHTTPStatusCode(): Number {
        return this.returnedHTTPStatusCode
    }
}
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
            type: Sequelize.STRING,
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
