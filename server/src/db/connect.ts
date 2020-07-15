import sequelize from './sequelize'

/**
 * Function that authenticate connection to database.
 * @function connect
 */
const connect = async () => {
    try {
        // synchronize database
        await sequelize.sync()
        // authenticate database connection
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (err) {
        console.log('Unable to connect to the database.')
        throw Error(err)
    }
}

export default connect
