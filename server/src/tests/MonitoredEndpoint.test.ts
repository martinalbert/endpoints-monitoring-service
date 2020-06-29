import request from 'supertest'
import jwt from 'jsonwebtoken'

import config from '../config'
import server from '../app'

import UserRepo from '../db/repos/mysql/user_mysql_repo'
import EndpointRepo from '../db/repos/mysql/monitoredEndpoint_mysql_repo'

import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import User from '../entities/User'

const testSuiteName = 'MonitoredEndpoint rest-api endpoint'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new EndpointRepo()
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

beforeAll(async () => {
    jest.setTimeout(80000)
    // seed in Users
    await userRepo.register(owner1)
    await userRepo.register(owner2)
})

beforeEach(async () => {})

afterEach(async () => {
    const endpoints1 = await repo.getAll(owner1.id)
    for (const endpoint of endpoints1) {
        await repo.delete(endpoint.id, owner1.id)
    }
    const endpoints2 = await repo.getAll(owner2.id)
    for (const endpoint of endpoints2) {
        await repo.delete(endpoint.id, owner2.id)
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

    // login & get token
    beforeEach(async () => {
        const user1 = <any>await userRepo.login(owner1.email, owner1.accessToken)
        user1Token = jwt.sign({ id: user1.id, email: user1.email }, config.JWT_SECRET, {
            expiresIn: '15m',
        })
        const user2 = <any>await userRepo.login(owner2.email, owner2.accessToken)
        user2Token = jwt.sign({ id: user2.id, email: user2.email }, config.JWT_SECRET, {
            expiresIn: '15m',
        })
        // User logged in
        endpoint1 = new MonitoredEndpoint(
            1,
            'test',
            'http://test.com/',
            new Date(),
            new Date(),
            120,
            owner1
        )
        // User not logged in
        endpoint2 = new MonitoredEndpoint(
            2,
            'test',
            'http://test.com/',
            new Date(),
            new Date(),
            220,
            owner2
        )
    })

    describe('GET /endpoints', () => {
        describe('When not authenticated User is trying to access endpoints', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .get('/endpoints')
                    .set('authorization', 'Bearer test')

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
        describe('When User has no endpoints', () => {
            test(`Then response is empty array`, async () => {
                const response = await request(server)
                    .get('/endpoints')
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(200)
                expect(response.body.dto.length).toBe(0)
                expect(response.body.dto).toMatchObject([])
            })
        })
        describe('When User has few endpoints and another User has other endpoints', () => {
            test(`Then response is array with only endpoints belonging to User`, async () => {
                const endpoint3 = new MonitoredEndpoint(
                    3,
                    'test',
                    'http://test.com/',
                    new Date(),
                    new Date(),
                    120,
                    owner1
                )
                // owner 1
                await repo.create(endpoint1)
                await repo.create(endpoint3)
                // owner 2
                await repo.create(endpoint2)

                const response1 = await request(server)
                    .get('/endpoints')
                    .set('authorization', `Bearer ${user1Token}`)
                const response2 = await request(server)
                    .get('/endpoints')
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response1.status).toBe(200)
                expect(response1.body.dto.length).toBe(2)
                expect(response1.body.dto[0].owner).toBe(endpoint1.owner.id)
                expect(response1.body.dto[1].owner).toBe(endpoint3.owner.id)

                expect(response2.status).toBe(200)
                expect(response2.body.dto.length).toBe(1)
                expect(response2.body.dto[0].owner).toBe(endpoint2.owner.id)
            })
        })
    })
    describe('GET /endpoints/:id', () => {
        describe('When authorized User is trying to access non-existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .get('/endpoints/1')
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthorized User is trying to access non-existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .get(`/endpoints/1`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthorized User is trying to access existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                // owner 2
                await repo.create(endpoint2)

                const response = await request(server)
                    .get(`/endpoints/${endpoint2.id}`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthenticated User is trying to access endpoint', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                // owner 2
                await repo.create(endpoint2)

                const response = await request(server)
                    .get(`/endpoints/${endpoint2.id}`)
                    .set('authorization', `Bearer test`)

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
    })
    describe('POST /endpoints', () => {
        describe('When authenticated User is trying to create new endpoint', () => {
            describe('With valid input data inside request body', () => {
                test(`Then created endpoint have to contain same owner`, async () => {
                    const response = await request(server)
                        .post('/endpoints')
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: endpoint1.monitoredInterval,
                        })

                    expect(response.status).toBe(201)
                    expect(response.ok).toBeTruthy()
                    expect(response.body.dto.owner).toBe(owner1.id)
                })
            })
            describe('With invalid URL input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const response = await request(server)
                        .post('/endpoints')
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: 'test',
                            monitoredInterval: endpoint1.monitoredInterval,
                        })

                    expect(response.status).toBe(500)
                    expect(response.body.code).toBe('InternalServer')
                    expect(response.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation isUrl on url failed'
                    )
                })
            })
            describe('With invalid monitoredInterval input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const response1 = await request(server)
                        .post('/endpoints')
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: 2,
                        })

                    expect(response1.status).toBe(500)
                    expect(response1.body.code).toBe('InternalServer')
                    expect(response1.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation min on monitoredInterval failed'
                    )
                    const response2 = await request(server)
                        .post('/endpoints')
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: 120.25,
                        })

                    expect(response2.status).toBe(500)
                    expect(response2.body.code).toBe('InternalServer')
                    expect(response2.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation isInt on monitoredInterval failed'
                    )
                })
            })
        })
        describe('When unauthenticated User is trying to create new endpoint', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .post('/endpoints')
                    .set('content-type', 'application/json')
                    .set('authorization', `Bearer test`)
                    .send({
                        name: endpoint1.name,
                        url: endpoint1.url,
                        monitoredInterval: 120.25,
                    })

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
    })
    describe('PUT /endpoints/:id', () => {
        let endpoint: MonitoredEndpoint
        beforeEach(async () => {
            endpoint = await repo.create(endpoint1)
        })
        describe('When authenticated User is trying to update endpoint', () => {
            describe('With valid input data inside request body', () => {
                test(`Then created endpoint have to contain updated data`, async () => {
                    const response = await request(server)
                        .put(`/endpoints/${endpoint.id}`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: 20,
                            lastCheck: endpoint1.dateOfLastCheck,
                        })
                    expect(response.status).toBe(200)
                    expect(response.ok).toBeTruthy()
                    expect(response.body.dto).toMatchObject([1])

                    const result = await repo.getByID(endpoint.id, owner1.id)
                    expect(result.id).toBe(endpoint.id)
                    expect(result.monitoredInterval).toBe(20)
                })
            })
            describe('With invalid URL input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const response = await request(server)
                        .put(`/endpoints/${endpoint.id}`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: 'test',
                            monitoredInterval: endpoint1.monitoredInterval,
                            lastCheck: endpoint1.dateOfLastCheck,
                        })

                    expect(response.status).toBe(500)
                    expect(response.body.code).toBe('InternalServer')
                    expect(response.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation isUrl on url failed'
                    )
                })
            })
            describe('With invalid monitoredInterval input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    // monitoredInterval min validation
                    const response1 = await request(server)
                        .put(`/endpoints/${endpoint.id}`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: 2,
                            lastCheck: endpoint1.dateOfLastCheck,
                        })

                    expect(response1.status).toBe(500)
                    expect(response1.body.code).toBe('InternalServer')
                    expect(response1.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation min on monitoredInterval failed'
                    )
                    // monitoredInterval isInt validation
                    const response2 = await request(server)
                        .put(`/endpoints/${endpoint.id}`)
                        .set('content-type', 'application/json')
                        .set('authorization', `Bearer ${user1Token}`)
                        .send({
                            name: endpoint1.name,
                            url: endpoint1.url,
                            monitoredInterval: 10.25,
                            lastCheck: endpoint1.dateOfLastCheck,
                        })

                    expect(response2.status).toBe(500)
                    expect(response2.body.code).toBe('InternalServer')
                    expect(response2.body.message).toBe(
                        'caused by SequelizeValidationError: Validation error: Validation isInt on monitoredInterval failed'
                    )
                })
            })
        })
        describe('When unauthenticated User is trying to update endpoint', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                // monitoredInterval min validation
                const response = await request(server)
                    .put(`/endpoints/${endpoint.id}`)
                    .set('authorization', `Bearer test`)
                    .send({
                        name: endpoint1.name,
                        url: endpoint1.url,
                        monitoredInterval: 120,
                        lastCheck: endpoint1.dateOfLastCheck,
                    })

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
    })
    describe('DEL /endpoints/:id', () => {
        let endpoint: MonitoredEndpoint
        beforeEach(async () => {
            endpoint = await repo.create(endpoint1)
        })

        describe('When authorized User is trying to delete non-existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/333`)
                    .set('authorization', `Bearer ${user1Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthorized User is trying to delete non-existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/333`)
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthorized User is trying to delete existing endpoint', () => {
            test(`Then response is 404 resourceNotFound`, async () => {
                const response = await request(server)
                    .del(`/endpoints/${endpoint.id}`)
                    .set('authorization', `Bearer ${user2Token}`)

                expect(response.status).toBe(404)
                expect(response.body.code).toBe('NotFound')
                expect(response.body.message).toBe(
                    'caused by Error: This User doesnt have access to this endpoint'
                )
            })
        })
        describe('When unauthenticated User is trying to delete endpoint', () => {
            test(`Then response is 401 UnauthorizedError`, async () => {
                const response = await request(server)
                    .del(`/endpoints/333`)
                    .set('authorization', `Bearer test`)

                expect(response.status).toBe(401)
                expect(response.body.code).toBe('Unauthorized')
                expect(response.body.message).toBe('You have no access')
            })
        })
    })
})
