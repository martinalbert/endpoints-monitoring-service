import config from '../config'

/**
 * Load an implementation of a specified DAO.
 * @param {string} daoName - String of specified Data Access Object
 * @returns {module} Built in require function that returns some module - in this case implementatioon of DAO module
 */
const loadDao = (daoName: string) => {
    const currentDatabase = config.CURRENT_DATABASE
    return require(`./repos/${currentDatabase}/${daoName}_${currentDatabase}_repo`)
}

export default {
    loadDao,
}
