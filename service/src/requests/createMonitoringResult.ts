import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from '../config'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import MonitoringResult from '../entities/MonitoringResult'

/**
 * HTTP Options \
 * Defines the options for axios request that create monitoring result.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - route after @property {string} baseURL
 * @property {string} baseURL - base route of URL
 * @property {object} headers - object representing headers in HTTP Request
 * @property {object} data - object representing body in HTTP Request
 */
const options: AxiosRequestConfig = {
    method: 'post',
    url: undefined,
    baseURL: config.RESTAPI_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: undefined,
    },
    data: {
        httpCode: undefined,
        httpPayload: undefined,
    },
}

/**
 * AXIOS Request \
 * Asynchronous function that set up axios request's options and sends request based on them.
 * @async
 * @param  {MonitoredEndpoint} endpoint - endpoint that monitoring is set to
 * @param  {MonitoringResult} result - monitoring result that is going to be created
 * @param  {string} token - token of user that contains this endpoint
 * @returns {Promise<MonitoringResult|any>}  created result
 */
export default async (
    endpoint: MonitoredEndpoint,
    result: MonitoringResult,
    token: string
): Promise<MonitoringResult | any> => {
    // setting up request
    options.headers.Authorization = `Bearer ${token}`
    options.url = `/endpoints/${endpoint.id}/results`
    options.data.httpCode = result.returnedHTTPStatusCode
    options.data.httpPayload = result.returnedPayload

    try {
        return await axios(options)
    } catch (error) {
        throw new Error(error.stack)
    }
}
