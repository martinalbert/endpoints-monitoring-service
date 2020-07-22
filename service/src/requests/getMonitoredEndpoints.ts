import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '../config'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'

/**
 * HTTP Options \
 * Defines the options for axios request that returns monitoring results.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - route after @property {string} baseURL
 * @property {string} baseURL - base route of URL
 * @property {object} headers - object representing headers in HTTP Request
 */
const options: AxiosRequestConfig = {
    method: 'get',
    url: '/endpoints',
    baseURL: config.RESTAPI_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: undefined,
    },
}

/**
 * Helper Funtion \
 * Maps the received endpoints from request to Entities of Monitored Endpoint
 * @function toArrayOfMonitoredEndpoints
 * @param  {any[]} endpoints - endpoints from request
 * @returns {MonitoredEndpoint[]} mapped monitored endpoints
 */
const toArrayOfMonitoredEndpoints = (endpoints: MonitoredEndpoint[]): MonitoredEndpoint[] => {
    let result: MonitoredEndpoint[] = Array()

    if (endpoints.length > 0)
        endpoints.forEach((endpoint: any) => {
            result.push(
                new MonitoredEndpoint(
                    endpoint.id,
                    endpoint.name,
                    endpoint.url,
                    endpoint.dateOfCreation,
                    endpoint.dateOfLastCheck,
                    endpoint.monitoredInterval,
                    endpoint.owner
                )
            )
        })

    return result
}

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoredEndpoint[]>} returned endpoint
 */
export default async (token: string): Promise<MonitoredEndpoint[]> => {
    options.headers.Authorization = `Bearer ${token}`

    let endpoints: AxiosResponse
    try {
        endpoints = await axios(options)
    } catch (error) {
        throw Error(error.stack)
    }

    return toArrayOfMonitoredEndpoints(endpoints.data.dto)
}
