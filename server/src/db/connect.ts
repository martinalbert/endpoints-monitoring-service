import sequelize from './sequelize'

/**
 * Function that authenticate connection to database.
 * @function connect
 */
const connect = async () => {
    try {
        // synchronize database
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (err) {
        console.error('Unable to connect to the database:', err)
    }
}

export default connect
