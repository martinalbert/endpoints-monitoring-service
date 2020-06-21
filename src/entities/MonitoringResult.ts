import MonitoredEndpoint from './MonitoredEndpoint'

interface IMonitoringResult {
    id: number
    dateOfCheck: Date
    returnedPayload: string
    returnedHTTPStatusCode: number
    monitoredEndpoint: MonitoredEndpoint
    toObject(): Object
}

export default class MonitoringResult implements IMonitoringResult {
    id: number
    dateOfCheck: Date
    returnedPayload: string
    returnedHTTPStatusCode: number
    monitoredEndpoint: MonitoredEndpoint

    constructor(
        id: number,
        dateOfCheck: Date,
        returnedPayload: string,
        returnedHTTPStatusCode: number,
        monitoredEndpoint: MonitoredEndpoint
    ) {
        this.id = id
        this.dateOfCheck = dateOfCheck
        this.returnedPayload = returnedPayload
        this.returnedHTTPStatusCode = returnedHTTPStatusCode
        this.monitoredEndpoint = monitoredEndpoint
    }

    toObject(): Object {
        return {
            id: this.id,
            dateOfCheck: this.dateOfCheck,
            returnedPayload: this.returnedPayload,
            returnedHTTPStatusCode: this.returnedPayload,
            monitoredEndpoint: this.monitoredEndpoint.id,
        }
    }
}
