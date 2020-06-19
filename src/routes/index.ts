import { Server } from 'restify'
import {
    getMonitoredEndpointByID,
    getAllMonitoredEndpoints,
    createMonitoredEndpoint,
    updateMonitoredEndpoint,
    deleteMonitoredEndpoint,
} from '../useCases/MonitoredEndpointUseCases'

export default (server: Server) => {
    console.log('setting up routes')

    server.get('/endpoints', async (req, res, next) =>
        getAllMonitoredEndpoints.exec(req, res, next)
    )
    server.get('/endpoints/:ID', async (req, res, next) =>
        getMonitoredEndpointByID.exec(req, res, next)
    )
    server.post('/endpoints', async (req, res, next) =>
        createMonitoredEndpoint.exec(req, res, next)
    )
    server.patch('/endpoints/:ID', async (req, res, next) =>
        updateMonitoredEndpoint.exec(req, res, next)
    )
    server.del('/endpoints/:ID', async (req, res, next) =>
        deleteMonitoredEndpoint.exec(req, res, next)
    )
}
