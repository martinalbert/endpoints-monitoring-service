import config from './config'
import app from './app'
import connect from './db/connect'
import seed from './db/repos/mysql/seed'
import { clearDB } from './db/repos/mysql/actions'

/**
 * Restify Server\
 * Listens on Port 3000
 */
const server = app

server.listen(config.PORT, () => {
    console.log(`server started on port: ${config.PORT}`)

    // connect to DB (mySQL)
    connect()
        .then(() => {
            // seed sample data
            return seed()
        })
        .then(() => console.log('data have been seeded'))
        .catch(err => {
            throw Error(err)
        })
})

server.on('error', (err: Error) => {
    if (err) {
        console.error(err)
        server.close()
    }
})
