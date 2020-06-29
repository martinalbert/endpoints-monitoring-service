import { Server } from 'restify'
import { register, login, getAllUsers } from '../useCases/UserUseCases'
import checkAuth from '../utils/checkAuth'
import {
    getEndpointByID,
    getAllEndpoints,
    createEndpoint,
    updateEndpoint,
    deleteEndpoint,
} from '../useCases/MonitoredEndpointUseCases'
import {
    getResultByID,
    getAllResults,
    createResult,
    deleteResult,
} from '../useCases/MonitoringResultUseCases'

/**
 * Routes Handler\
 * Function that handles all API Endpoints for specified HTTP Server.
 *
 * @function routes
 * @param {Server} server - Restify HTTP Server
 */
export default (server: Server) => {
    // Users API Endpoints
    server.get(
        '/users',
        checkAuth,
        async (req, res, next) => await getAllUsers.exec(req, res, next)
    )
    server.post(
        '/user/register',
        async (req, res, next) => await register.exec(req, res, next)
    )
    server.post('/user/login', async (req, res, next) => await login.exec(req, res, next))

    // Endpoints API Endpoints
    server.get(
        '/endpoints',
        checkAuth,
        async (req, res, next) => await getAllEndpoints.exec(req, res, next)
    )
    server.get(
        '/endpoints/:id',
        checkAuth,
        async (req, res, next) => await getEndpointByID.exec(req, res, next)
    )
    server.post(
        '/endpoints',
        checkAuth,
        async (req, res, next) => await createEndpoint.exec(req, res, next)
    )
    server.put(
        '/endpoints/:id',
        checkAuth,
        async (req, res, next) => await updateEndpoint.exec(req, res, next)
    )
    server.del(
        '/endpoints/:id',
        checkAuth,
        async (req, res, next) => await deleteEndpoint.exec(req, res, next)
    )

    // Results API Endpoints
    server.get(
        '/endpoints/:eID/results',
        checkAuth,
        async (req, res, next) => await getAllResults.exec(req, res, next)
    )
    server.get(
        '/endpoints/:eID/results/:id',
        checkAuth,
        async (req, res, next) => await getResultByID.exec(req, res, next)
    )
    server.post(
        '/endpoints/:eID/results',
        checkAuth,
        async (req, res, next) => await createResult.exec(req, res, next)
    )
    server.del(
        '/endpoints/:eID/results/:id',
        checkAuth,
        async (req, res, next) => await deleteResult.exec(req, res, next)
    )
}
