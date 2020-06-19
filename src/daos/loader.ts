import config from '../config'

/**
 * Load an implementation of a specified dao(repo).
 * @param {string} daoName - String of specified Data Access Object
 * @returns {module} Built in require function that returns some module - in this case implementatioon of DAO module
 */
const loadRepo = (daoName: string) => {
    const currentDatabase = config.CURRENT_DATABASE
    return require(`./repos/${currentDatabase}/${daoName}_${currentDatabase}_repo`)
        .default
}

/**
 * Load an abstraction(interface) of a specified repo.
 * @param {string} abstraction - String of specified interface
 * @returns {module} Built in require function that returns some module - in this case interface
 */
const loadInterface = (abstraction: string) => {
    return require(`./repos/I${abstraction}Repo`).default
}

export default {
    loadRepo,
    loadInterface,
}