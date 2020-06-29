import request from 'supertest'
import jwt from 'jsonwebtoken'

import config from '../config'
import server from '../app'

import UserRepo from '../db/repos/mysql/user_mysql_repo'
import EndpointRepo from '../db/repos/mysql/monitoredEndpoint_mysql_repo'
import ResultRepo from '../db/repos/mysql/monitoringResult_mysql_repo'

import User from '../entities/User'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import MonitoringResult from '../entities/MonitoringResult'

const testSuiteName = 'MonitoringResult rest-api endpoint'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new ResultRepo()
const endpointRepo = new EndpointRepo()
const userRepo = new UserRepo()
// test users
const owner1 = new User(
    1,
    'Applifting',
    'info@applifting.cz',
    '93f39e2f-80de-4033-99ee-249d92736a25'
)
const owner2 = new User(
    2,
    'Batman',
    'batman@example.com',
    'dcb20f8a-5657-4f1b-9f7f-ce65739b359e'
)
// test endpoints
const testEndpoint1 = new MonitoredEndpoint(
    0,
    'test',
    'http://test.com/',
    new Date(),
    new Date(),
    120,
    owner1
)
const testEndpoint2 = new MonitoredEndpoint(
    0,
    'test',
    'http://test.com/',
    new Date(),
    new Date(),
    220,
    owner2
)
let user1: User, user2: User

beforeAll(async () => {
    jest.setTimeout(80000)
    // seed in Users
    await userRepo.register(owner1)
    await userRepo.register(owner2)
})

afterEach(async () => {
    const endpoints1 = await endpointRepo.getAll(owner1.id)
    for (const endpoint of endpoints1) {
        await endpointRepo.delete(endpoint.id, owner1.id)
    }
    const endpoints2 = await endpointRepo.getAll(owner2.id)
    for (const endpoint of endpoints2) {
        await endpointRepo.delete(endpoint.id, owner2.id)
    }
})

afterAll(async () => {
    const users = await userRepo.getAll()
    for (const user of users) {
        await userRepo.delete(user.id)
    }
})

describe(`${testKeyPrefix}`, () => {
    let endpoint1: MonitoredEndpoint, endpoint2: MonitoredEndpoint
    let user1Token: string, user2Token: string
    let result1: MonitoringResult, result2: MonitoringResult

    beforeEach(async () => {
        // testing tokens
        const user1 = <any>await userRepo.login(owner1.email, owner1.accessToken)
        user1Token = jwt.sign({ id: user1.id, email: user1.email }, config.JWT_SECRET, {
            expiresIn: '15m',
        })
        const user2 = <any>await userRepo.login(owner2.email, owner2.accessToken)
        user2Token = jwt.sign({ id: user2.id, email: user2.email }, config.JWT_SECRET, {
            expiresIn: '15m',
        })

        // testing endpoints
        endpoint1 = await endpointRepo.create(testEndpoint1)
        endpoint2 = await endpointRepo.create(testEndpoint2)

        // testing results
        result1 = new MonitoringResult(1, new Date(), 'payload', 200, endpoint1)
        result2 = new MonitoringResult(2, new Date(), 'payload', 404, endpoint2)
    })

    describe('GET /endpoints/:eID/results', () => {
        describe('When not authenticated User is trying to access results', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results`)
                    .set('authorization', 'Bearer test')

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
        describe('When Endpoint has no Results', () => {
            test(`Then response is empty array`, async () => {
                const response = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(200)
                expect(response.body.dto.length).toBe(0)
                expect(response.body.dto).toMatchObject([])
            })
        })
        describe('When Endpoint has few Results and another Endpoint has other endpoints', () => {
            test(`Then response is array with only endpoints belonging to authorized Endpoint`, async () => {
                const result3 = new MonitoringResult(3, new Date(), 'payload', 500, endpoint2)

                // endpoint 1
                await repo.create(result1)
                // endpoint 2
                await repo.create(result2)
                await repo.create(result3)

                const response1 = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results`)
                    .set('authorization', `Bearer ${user1Token}`)
                const response2 = await request(server)
                    .get(`/endpoints/${endpoint2.id}/results`)
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response1.status).toBe(200)
                expect(response1.body.dto.length).toBe(1)
                expect(response1.body.dto[0].monitoredEndpoint).toBe(
                    result1.monitoredEndpoint.id
                )

                expect(response2.status).toBe(200)
                expect(response2.body.dto.length).toBe(2)
                expect(response2.body.dto[0].monitoredEndpoint).toBe(
                    result2.monitoredEndpoint.id
                )
                expect(response2.body.dto[1].monitoredEndpoint).toBe(
                    result3.monitoredEndpoint.id
                )
            })
        })
    })
    describe(`GET /endpoints/:eID/results/:id`, () => {
        describe('When unauthenticated User is trying to access results', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                // not-existing result
                const response1 = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results/1`)
                    .set('authorization', `Bearer test`)

                // existing result
                const newResult1 = await repo.create(result1)
                const response2 = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results/${newResult1.id}`)
                    .set('authorization', `Bearer test`)

                expect(response1.status).toBe(401)
                expect(response1.body.code).toBe('Unauthorized')
                expect(response1.body.message).toBe('You have no access')

                expect(response2.status).toBe(401)
                expect(response2.body.code).toBe('Unauthorized')
                expect(response2.body.message).toBe('You have no access')
            })
        })
        describe('When unauthorized User is trying to access Result that is not associated to his Endpoint', () => {
            test(`Then response is 404 ResourceNotFound`, async () => {
                const newResult = await repo.create(result1)
                const response = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results/${newResult.id}`)
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    `caused by Error: This User doesnt have access to this endpoint`
                )
            })
        })
        describe('When trying to access non-existing result with existing endpoint', () => {
            test(`Then Response is 404 ResourceNotFound`, async () => {
                const response = await request(server)
                    .get(`/endpoints/${endpoint1.id}/results/120`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    `caused by Error: There is no monitoring result with id: 120 for this Endpoint.`
                )
            })
        })
    })
    describe('POST /endpoints/:eID/results', () => {
        describe('When unauthenticated User is trying to create new result', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .post(`/endpoints/${endpoint1.id}/results`)
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer test`)
                    .send({
                        httpCode: 200,
                        httpPayload: 'test',
                    })

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
        describe('When authenticated User is trying to create new Result', () => {
            describe('With valid input data inside request body', () => {
                test(`Then created Result have to contain same Endpoint`, async () => {
                    const response = await request(server)
                        .post(`/endpoints/${endpoint1.id}/results`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            httpCode: 200,
                            httpPayload: 'test',
                        })

                    expect(response.status).toBe(201)
                    expect(response.ok).toBeTruthy()
                    expect(response.body.dto.monitoredEndpoint).toBe(endpoint1.id)
                })
            })
            describe('With invalid HTTP Status Code input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const response = await request(server)
                        .post(`/endpoints/${endpoint1.id}/results`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            httpCode: 200.25,
                            httpPayload: 'test',
                        })

                    expect(response.status).toBe(500)
                    expect(response.body.code).toBe('InternalServer')
                    expect(response.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation isInt on returnedHTTPStatusCode failed'
                    )
                })
            })
        })
    })
    describe('DEL /endpoints/:eID/results/:id', () => {
        let result: MonitoringResult
        beforeEach(async () => {
            result = await repo.create(result1)
        })
        describe('When unauthorized User is trying to delete Result', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/${result.monitoredEndpoint.id}/results/${result.id}`)
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthenticated User is trying to delete Result', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .del(`/endpoints/${result.monitoredEndpoint.id}/results/${result.id}`)
                    .set('authorization', `Bearer test`)

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
        describe('When authorized User is trying to delete non-existing Result with existing Endpoint', () => {
            test(`Then response is 404 ResourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/${result.monitoredEndpoint.id}/results/120`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    `caused by Error: This User doesnt have access to this endpoint`
                )
            })
        })
        describe('When authorized User is trying to delete existing Result with not-existing Endpoint', () => {
            test(`Then response is 404 ResourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/0/results/${result.id}`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    `caused by Error: This User doesnt have access to this endpoint`
                )
            })
        })
    })
})
