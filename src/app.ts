import restify from 'restify'
import routes from './routes'

const app = restify.createServer()

// Middlewares
app.use(restify.plugins.bodyParser())

// Routes Handlers
routes(app)

export default app
