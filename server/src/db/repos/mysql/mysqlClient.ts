import { Sequelize } from 'sequelize'
import config from '../../../config'
const MYSQL_PORT = Number(config.MYSQL_PORT)

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
export const sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PW, {
    host: config.MYSQL_URL,
    port: MYSQL_PORT,
    dialect: 'mysql',

    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    logging: false,
})

/**
 * Function that authenticate connection to database.
 * @function connect
 */
export const connect = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')

            // synchronize database
            sequelize.sync()
        })
        .catch((err: Error) => {
            console.error('Unable to connect to the database:', err)
        })
}

/**
 * Function that drops all tables from database
 * @function dropAllTables
 */
export const dropAllTables = () => {
    sequelize.sync({ force: true })
}
