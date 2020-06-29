import config from '../config'

/**
 * Load an implementation of a specified dao(repo).
 * @function loadRepo
 * @param {string} daoName - String of specified Data Access Object
 * @returns {module} implementatioon of DAO module
 */
const loadRepo = (daoName: string) => {
    const currentDatabase = config.CURRENT_DATABASE
    return require(`./repos/${currentDatabase}/${daoName}_${currentDatabase}_repo`).default
}

/**
 * Load an implementation of a specified database client.
 * @function loadClient
 * @returns {module} implementatioon of database client
 */
const loadClient = () => {
    const currentDatabase = config.CURRENT_DATABASE
    return require(`./repos/${currentDatabase}/${currentDatabase}Client`)
}

export default {
    loadRepo,
    loadClient,
}
