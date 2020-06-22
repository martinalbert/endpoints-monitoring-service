import User from './User'

interface IMonitoredEndpoint {
    id: number
    name: string
    url: string
    dateOfCreation: Date
    dateOfLastCheck: Date
    monitoredInterval: number
    owner: User
    toObject(): Object
}

export default class MonitoredEndpoint implements IMonitoredEndpoint {
    id: number
    name: string
    url: string
    dateOfCreation: Date
    dateOfLastCheck: Date
    monitoredInterval: number
    owner: User

    constructor(
        id: number,
        name: string,
        url: string,
        dateOfCreation: Date,
        dateOfLastCheck: Date,
        monitoredInterval: number,
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

    toObject(): Object {
        return {
            name: this.name,
            url: this.url,
            dateOfCreation: this.dateOfCreation,
            dateOfLastCheck: this.dateOfLastCheck,
            monitoredInterval: this.monitoredInterval,
            owner: this.owner.id,
        }
    }
}
