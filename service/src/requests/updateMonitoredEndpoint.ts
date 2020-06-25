import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '../config'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'

/**
 * HTTP Options \
 * Defines the options for axios request that updates monitored endpoint.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - route after @property {string} baseURL
 * @property {string} baseURL - base route of URL
 * @property {object} headers - object representing headers in HTTP Request
 * @property {object} data - object representing body in HTTP Request
 */
const options: AxiosRequestConfig = {
    method: 'put',
    url: undefined,
    baseURL: config.RESTAPI_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: undefined,
    },
    data: {
        name: undefined,
        url: undefined,
        monitoredInterval: undefined,
        lastCheck: undefined,
    },
}

/**
 * Helper Funtion \
 * Maps the received updatedEndpoint from request to Entity of Monitored Endpoint
 * @function toMonitoredEndpoint
 * @param  {any} updatedEndpoint - endpoint from request
 * @returns {MonitoredEndpoint} mapped updated endpoint
 */
const toMonitoredEndpoint = (updatedEndpoint: any): MonitoredEndpoint => {
    return new MonitoredEndpoint(
        updatedEndpoint.id,
        updatedEndpoint.name,
        updatedEndpoint.url,
        updatedEndpoint.dateOfCreation,
        updatedEndpoint.dateOfLastCheck,
        updatedEndpoint.monitoredInterval,
        updatedEndpoint.owner
    )
}

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @param  {MonitoredEndpoint} updatedEndpoint - endpoint that will be updated
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoredEndpoint | any>} updated endpoint
 */
export default async (
    updatedEndpoint: MonitoredEndpoint,
    token: string
): Promise<MonitoredEndpoint | any> => {
    // setting up request
    options.headers.Authorization = `Bearer ${token}`
    options.url = `/endpoints/${updatedEndpoint.id}`
    options.data.name = updatedEndpoint.name
    options.data.url = updatedEndpoint.url
    options.data.monitoredInterval = updatedEndpoint.monitoredInterval
    options.data.lastCheck = updatedEndpoint.dateOfLastCheck

    let newResult: AxiosResponse
    try {
        newResult = await axios(options)
    } catch (error) {
        throw Error(error.stack)
    }

    return toMonitoredEndpoint(newResult.data.dto)
}
