import { Server } from 'restify'
import { registerUser, loginUser, getAllUsersController } from '../useCases/UserUseCases'
import checkAuth from '../utils/checkAuth'
import {
    getMonitoredEndpointByID,
    getAllMonitoredEndpoints,
    createMonitoredEndpoint,
    updateMonitoredEndpoint,
    deleteMonitoredEndpoint,
} from '../useCases/MonitoredEndpointUseCases'
import {
    getMonitoringResultByID,
    getAllMonitoringResults,
    createMonitoringResult,
    deleteMonitoringResult,
} from '../useCases/MonitoringResultUseCases'

export default (server: Server) => {
    server.get('/users', checkAuth, async (req, res, next) =>
        getAllUsersController.exec(req, res, next)
    )

    server.post('/user/login', async (req, res, next) => loginUser.exec(req, res, next))
    server.post('/user/register', async (req, res, next) => registerUser.exec(req, res, next))

    server.get('/endpoints', checkAuth, async (req, res, next) =>
        getAllMonitoredEndpoints.exec(req, res, next)
    )
    server.get('/endpoints/:id', checkAuth, async (req, res, next) =>
        getMonitoredEndpointByID.exec(req, res, next)
    )
    server.post('/endpoints', checkAuth, async (req, res, next) =>
        createMonitoredEndpoint.exec(req, res, next)
    )
    server.put('/endpoints/:id', checkAuth, async (req, res, next) =>
        updateMonitoredEndpoint.exec(req, res, next)
    )
    server.del('/endpoints/:id', checkAuth, async (req, res, next) =>
        deleteMonitoredEndpoint.exec(req, res, next)
    )

    server.get('/endpoints/:eID/results', checkAuth, async (req, res, next) =>
        getAllMonitoringResults.exec(req, res, next)
    )
    server.get('/endpoints/:eID/results/:id', checkAuth, async (req, res, next) =>
        getMonitoringResultByID.exec(req, res, next)
    )
    server.post('/endpoints/:eID/results', checkAuth, async (req, res, next) =>
        createMonitoringResult.exec(req, res, next)
    )
    server.del('/endpoints/:eID/results/:id', checkAuth, async (req, res, next) =>
        deleteMonitoringResult.exec(req, res, next)
    )
}
