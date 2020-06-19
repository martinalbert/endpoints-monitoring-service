import restify from 'restify'
import morgan from 'morgan'
import routes from './routes'

const server = restify.createServer()

// Middlewares
server.use(restify.plugins.bodyParser())
server.use(morgan('dev'))

// Routes Handlers
routes(server)

export default server
