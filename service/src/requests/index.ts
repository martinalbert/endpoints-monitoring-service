import users from './getUsers'
import loginUser from './login'
import getMonitoredEndpoints from './getMonitoredEndpoints'
import updateMonitoredEndpoint from './updateMonitoredEndpoint'
import createMonitoringResult from './createMonitoringResult'

import MonitoringResult from 'src/entities/MonitoringResult'
import MonitoredEndpoint from 'src/entities/MonitoredEndpoint'
import User from '../entities/User'

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @function getUsers
 * @returns {Promise<User|any>} returned users
 */
export const getUsers = async () => await users()

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @function login
 * @param  {User} user - user that is going to be loged in
 * @returns {Promise<string>} token
 */
export const login = async (user: User) => await loginUser(user)

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @function getEndpoints
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoredEndpoint[]|any>} returned endpoint
 */
export const getEndpoints = async (token: string) => await getMonitoredEndpoints(token)

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @function updateEndpoint
 * @param  {MonitoredEndpoint} updatedEndpoint - endpoint that will be updated
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoredEndpoint} updated endpoint
 */
export const updateEndpoint = async (newEndpoint: MonitoredEndpoint, token: string) =>
    await updateMonitoredEndpoint(newEndpoint, token)

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @function createResult
 * @param  {MonitoredEndpoint} endpoint - endpoint that monitoring is set to
 * @param  {MonitoringResult} result - monitoring result that is going to be created
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoringResult|any>}  created result
 */
export const createResult = async (
    endpoint: MonitoredEndpoint,
    result: MonitoringResult,
    token: string
) => await createMonitoringResult(endpoint, result, token)
