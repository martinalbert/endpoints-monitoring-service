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
    server.get('/endpoints', (req, res) => getAllMonitoredEndpoints.exec(req, res))
    server.get('/endpoints/:ID', (req, res) => getMonitoredEndpointByID.exec(req, res))
    server.post('/endpoints', (req, res) => createMonitoredEndpoint.exec(req, res))
    server.patch('/endpoints/:ID', (req, res) => updateMonitoredEndpoint.exec(req, res))
    server.del('/endpoints/:ID', (req, res) => deleteMonitoredEndpoint.exec(req, res))
}
