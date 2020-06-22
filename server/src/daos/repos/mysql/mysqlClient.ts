import { Sequelize } from 'sequelize'
import config from '../../../config'

// Host	localhost
// Port	8889
// User	root
// Password	root
// Socket	/Applications/MAMP/tmp/mysql/mysql.sock

export const sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PW, {
    host: config.MYSQL_URL,
    port: config.MYSQL_PORT,
    dialect: 'mysql',
})

export const connect = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        })
        .catch((err: Error) => {
            console.error('Unable to connect to the database:', err)
        })

    // drop all tables
    // sequelize.sync({ force: true })
}
