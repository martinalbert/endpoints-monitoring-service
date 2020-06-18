import config from './config'
import app from './app'

const server = app

server.listen(config.PORT, () => {
    console.log(`server started on port: ${config.PORT}`)

    // connect to mySQL
})

server.on('error', (err: Error) => {
    if (err) {
        console.error(err)
        server.close()
    }
})
