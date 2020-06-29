import restify from 'restify'
import morgan from 'morgan'
import routes from './routes'

/**
 * Restify Server\
 * Listens on Port 3000
 */
const server = restify.createServer()

// Middlewares & plugins
server.use(restify.plugins.bodyParser())
server.use(morgan('dev'))

// Routes Handler
routes(server)

export default server
