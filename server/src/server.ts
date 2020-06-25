import config from './config'
import app from './app'
import { connect } from './db'

const server = app

server.listen(config.PORT, () => {
    console.log(`server started on port: ${config.PORT}`)

    // connect to DB (mySQL)
    connect()
})

server.on('error', (err: Error) => {
    if (err) {
        console.error(err)
        server.close()
    }
})
