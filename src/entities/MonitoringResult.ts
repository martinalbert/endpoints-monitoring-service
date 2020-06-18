import MonitoredEndpoint from './MonitoredEndpoint'

interface IMonitoringResult {
    id: Number
    dateOfCheck: Date
    returnedPayload: string
    returnedHTTPStatusCode: Number
    monitoredEndpoint: MonitoredEndpoint
}

export default class MonitoringResult implements IMonitoringResult {
    id: Number
    dateOfCheck: Date
    returnedPayload: string
    returnedHTTPStatusCode: Number
    monitoredEndpoint: MonitoredEndpoint

    constructor(
        id: Number,
        dateOfCheck: Date,
        returnedPayload: string,
        returnedHTTPStatusCode: Number,
        monitoredEndpoint: MonitoredEndpoint
    ) {
        this.id = id
        this.dateOfCheck = dateOfCheck
        this.returnedPayload = returnedPayload
        this.returnedHTTPStatusCode = returnedHTTPStatusCode
        this.monitoredEndpoint = monitoredEndpoint
    }
}
