import { Sequelize } from 'sequelize'
import config from '../config'

/**
 * Instance of Sequelize\
 * Represent connection to database.
 *
 * @instance of Sequelize
 */
const sequelize = new Sequelize(config.MYSQL_DB, config.MYSQL_USER, config.MYSQL_PW, {
    host: config.MYSQL_URL,
    port: config.MYSQL_PORT,
    dialect: 'mysql',

    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    logging: false,
})

export default sequelize
