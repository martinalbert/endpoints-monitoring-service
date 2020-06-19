import { Server } from 'restify'
import {
    getMonitoredEndpointByID,
    getAllMonitoredEndpoints,
    createMonitoredEndpoint,
    updateMonitoredEndpoint,
    deleteMonitoredEndpoint,
} from '../useCases/MonitoredEndpointUseCases'
import { registerUser, loginUser } from '../useCases/UserUseCases'

export default (server: Server) => {
    server.get('/endpoints', async (req, res, next) =>
        getAllMonitoredEndpoints.exec(req, res, next)
    )
    server.get('/endpoints/:id', async (req, res, next) =>
        getMonitoredEndpointByID.exec(req, res, next)
    )
    server.post('/endpoints', async (req, res, next) =>
        createMonitoredEndpoint.exec(req, res, next)
    )
    server.put('/endpoints/:id', async (req, res, next) =>
        updateMonitoredEndpoint.exec(req, res, next)
    )
    server.del('/endpoints/:id', async (req, res, next) =>
        deleteMonitoredEndpoint.exec(req, res, next)
    )
    server.post('/user/register', async (req, res, next) =>
        registerUser.exec(req, res, next)
    )
    server.post('/user/login', async (req, res, next) => loginUser.exec(req, res, next))
}
