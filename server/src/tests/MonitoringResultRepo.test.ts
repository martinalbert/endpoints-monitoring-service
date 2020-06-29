import { connect } from '../db'

import MonitoredEndpointRepo from '../db/repos/mysql/monitoredEndpoint_mysql_repo'
import MonitoringRepo from '../db/repos/mysql/monitoringResult_mysql_repo'
import UserRepo from '../db/repos/mysql/user_mysql_repo'

import User from '../entities/User'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import MonitoringResult from '../entities/MonitoringResult'

const testSuiteName = 'Monitoring Result Repo Functions'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new MonitoringRepo()
const endpointRepo = new MonitoredEndpointRepo()
const userRepo = new UserRepo()

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
const testEndpoint1 = new MonitoredEndpoint(
    1,
    'test',
    'http://test.com/',
    new Date(),
    new Date(),
    120,
    owner1
)
const testEndpoint2 = new MonitoredEndpoint(
    2,
    'test',
    'http://test.com/',
    new Date(),
    new Date(),
    220,
    owner2
)
let user1: User, user2: User

beforeAll(async () => {
    connect()
    // testing users
    user1 = await userRepo.register(owner1)
    user2 = await userRepo.register(owner2)
})

afterEach(async () => {
    const endpoints1 = await endpointRepo.getAll(user1.id)
    for (const endpoint of endpoints1) {
        await endpointRepo.delete(endpoint.id, user1.id)
    }
    const endpoints2 = await endpointRepo.getAll(user2.id)
    for (const endpoint of endpoints2) {
        await endpointRepo.delete(endpoint.id, user2.id)
    }
})

afterAll(async () => {
    const users = await userRepo.getAll()
    for (const user of users) {
        await userRepo.delete(user.id)
    }
})

describe(`${testKeyPrefix}`, () => {
    let result1: MonitoringResult, result2: MonitoringResult
    let endpoint1: MonitoredEndpoint, endpoint2: MonitoredEndpoint

    beforeEach(async () => {
        // testing endpoint
        endpoint1 = await endpointRepo.create(testEndpoint1)
        endpoint2 = await endpointRepo.create(testEndpoint2)

        result1 = new MonitoringResult(1, new Date(), 'payload', 200, endpoint1)
        result2 = new MonitoringResult(2, new Date(), 'payload', 404, endpoint2)
    })
    describe(`getByID`, () => {
        describe('When trying to access existing result with existing endpoint', () => {
            test(`Then Result should be created successfully`, async () => {
                await repo.create(result1)
                await expect(repo.getByID(result1.id, endpoint1)).resolves
            })
        })
        describe('When trying to access non-existing result with existing endpoint', () => {
            test(`Then Error 'There is no monitoring result with id: {:id} for this Endpoint' will be Thrown`, async () => {
                await expect(repo.getByID(1, endpoint1)).rejects.toThrowError(
                    'There is no monitoring result with id: 1 for this Endpoint'
                )
            })
        })
        describe('When trying to access non-existing result with non-existing endpoint', () => {
            test(`Then Error 'There is no monitoring result with id: {:id} for this Endpoint' will be Thrown`, async () => {
                endpoint1.id = 333
                await expect(repo.getByID(1, endpoint1)).rejects.toThrowError(
                    'There is no monitoring result with id: 1 for this Endpoint'
                )
            })
        })
    })
    describe('getAll', () => {
        describe('When Endpoint has no Results', () => {
            test(`Then response is empty array`, async () => {
                const expected = await repo.getAll(endpoint1)

                expect(expected.length).toBe(0)
                expect(expected).toMatchObject([])
            })
        })
        describe('When Endpoint has few Results and another Endpoint has other endpoints', () => {
            test(`Then response is array with only endpoints belonging to authorized Endpoint`, async () => {
                const result3 = new MonitoringResult(3, new Date(), 'payload', 500, endpoint2)

                await repo.create(result1)
                await repo.create(result2)
                await repo.create(result3)

                // endpoint 1
                const expected1 = await repo.getAll(endpoint1)
                expect(expected1.length).toBe(1)
                // endpoint 2
                const expected2 = await repo.getAll(endpoint2)
                expect(expected2.length).toBe(2)
            })
        })
    })
    describe('getLast10', () => {
        describe('When Endpoint has no Results', () => {
            test(`Then response is empty array`, async () => {
                const expected = await repo.getAll(endpoint1)

                expect(expected.length).toBe(0)
                expect(expected).toMatchObject([])
            })
        })
        describe('When Endpoint creates more than 10 Results', () => {
            test(`Then response will contain only 10 Results`, async () => {
                await repo.create(result1)

                const expected = [result1.toObject()]
                const count = 20
                for (let i = 2; i <= count; i++) {
                    const result = new MonitoringResult(
                        i,
                        new Date(),
                        'payload',
                        500,
                        endpoint1
                    )
                    expected.push(result.toObject())
                    await repo.create(result)
                }
                expect(expected.length).toBe(20)

                const results = await repo.getLast10(endpoint1)
                expect(results.length).toBe(10)
            })
        })
    })
    describe('create', () => {
        describe('When trying to create new Result', () => {
            describe('With valid input data inside request body', () => {
                test(`Then created Result have to contain same Endpoint`, async () => {
                    // on endpoint1
                    const result = await repo.create(result1)
                    expect(result.monitoredEndpoint).toEqual(result1.monitoredEndpoint.id)
                })
            })
            describe('With invalid HTTP Status Code input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    result1.returnedHTTPStatusCode = 201.25
                    await expect(repo.create(result1)).rejects.toThrowError(
                        'Validation error: Validation isInt on returnedHTTPStatusCode failed'
                    )
                })
            })
        })
    })
    describe('delete', () => {
        describe('When trying to delete non-existing Result with existing Endpoint', () => {
            test(`Then Error 'There is no monitoring result with id: {:id} for this Endpoint' will be Thrown`, async () => {
                await expect(
                    repo.delete(result1.id, result1.monitoredEndpoint)
                ).rejects.toThrowError(
                    'There is no monitoring result with id: 1 for this Endpoint'
                )
            })
        })
        describe('When trying to delete existing Result with not-existing Endpoint', () => {
            test(`Then Error 'There is no monitoring result with id: {:id} for this Endpoint' will be Thrown`, async () => {
                await repo.create(result1)
                const notExistingEndpoint = new MonitoredEndpoint(
                    0,
                    'nope',
                    'http://url.com',
                    new Date(),
                    new Date(),
                    120,
                    owner1
                )

                await expect(
                    repo.delete(result1.id, notExistingEndpoint)
                ).rejects.toThrowError(
                    'There is no monitoring result with id: 1 for this Endpoint'
                )
            })
        })
        describe('When trying to delete existing Result with existing Endpoint', () => {
            test(`Then Error 'There is no monitoring result with id: {:id} for this Endpoint' will be Thrown`, async () => {
                await repo.create(result1)
                await expect(repo.delete(result1.id, result1.monitoredEndpoint)).resolves
            })
        })
    })
})
