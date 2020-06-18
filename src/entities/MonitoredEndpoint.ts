import User from './User'

interface IMonitoredEndpoint {
    id: Number
    name: string
    url: string
    dateOfCreation: Date
    dateOfLastCheck: Date
    monitoredInterval: Number
    owner: User
}

export default class MonitoredEndpoint implements IMonitoredEndpoint {
    id: Number
    name: string
    url: string
    dateOfCreation: Date
    dateOfLastCheck: Date
    monitoredInterval: Number
    owner: User

    constructor(
        id: Number,
        name: string,
        url: string,
        dateOfCreation: Date,
        dateOfLastCheck: Date,
        monitoredInterval: Number,
        owner: User
    ) {
        this.id = id
        this.name = name
        this.url = url
        this.dateOfCreation = dateOfCreation
        this.dateOfLastCheck = dateOfLastCheck
        this.monitoredInterval = monitoredInterval
        this.owner = owner
    }
}
