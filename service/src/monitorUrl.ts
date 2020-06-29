import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { createResult, updateEndpoint } from './requests'
import MonitoringResult from './entities/MonitoringResult'
import MonitoredEndpoint from './entities/MonitoredEndpoint'

/**
 * HTTP Options \
 * Defines the options for axios request that returns monitoring results.
 * @constant
 * @type {AxiosRequestConfig}
 * @property {string} method - HTTP method
 * @property {string} url - Absolute URL
 */
const options: AxiosRequestConfig = {
    method: 'get',
    url: undefined,
}

/**
 * AXIOS Request \
 * Asynchronous function that sets URL and sends request to that URL.
 *
 * @async
 * @function request
 * @param {string} url - URL to which the request is sent.
 * @returns {Promise<AxiosResponse<any>>} Response from url specified in parameters
 */
const request = async (url: string) => {
    // set the url for request
    options.url = url

    // make a request to url from endpoint
    try {
        return await axios(options)
    } catch (error) {
        throw Error(error.stack)
    }
}

/**
 * Callback function inside monitoring interval that calls @function request \
 * and creates new MonitoringResult and updates endpoint that is specified in parameters.
 *
 * @function callback
 * @param {MonitoredEndpoint} endpoint - endpoint which is being monitored
 * @param {string} token
 */
const callback = (endpoint: MonitoredEndpoint, token: string) => {
    request(endpoint.url)
        .then(async (response: AxiosResponse) => {
            console.log('request to endpoint was made')

            // get data to create new MonitoringResult
            const httpStatus = response.status
            const returnedPayload = response.data
            const dateOfCheck = new Date(Date.now())

            if (!httpStatus || !returnedPayload) throw Error('http status or data not found.')

            // create new instance of Monitoring Result
            const result = new MonitoringResult(
                0,
                dateOfCheck,
                returnedPayload,
                httpStatus,
                endpoint
            )

            // create new db record of Monitoring Result
            await createResult(endpoint, result, token).catch((error: AxiosError) => {
                throw Error(error.stack)
            })
            console.log('monitoring result was created')

            // update endpoints date of last check
            endpoint.dateOfLastCheck = dateOfCheck
            await updateEndpoint(endpoint, token).catch((error: AxiosError) => {
                throw Error(error.stack)
            })
            console.log('monitored endpoint was updated')
        })
        .catch((error: AxiosError) => {
            throw Error(error.stack)
        })
}

/**
 * Function that is monitoring endpoint specified in parameters for time peried interval specified in monitored endpoint.\
 * This time period is defined in seconds.
 *
 * @function monitorUrl
 * @param  {MonitoredEndpoint} endpoint
 * @param  {string} token
 */
export default (endpoint: MonitoredEndpoint, token: string) => {
    const interval = endpoint.monitoredInterval * 1000

    // create setInterval function
    callback(endpoint, token)
    setInterval(callback, interval, endpoint, token)
}
