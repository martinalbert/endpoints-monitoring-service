import { connect, dropAllTables } from '../db'
import User from '../entities/User'
import MonitoredEndpoint from '../entities/MonitoredEndpoint'
import MonitoredEndpointRepo from '../db/repos/mysql/monitoredEndpoint_mysql_repo'
import UserRepo from '../db/repos/mysql/user_mysql_repo'

const testSuiteName = 'MonitoredEndpoint Repo Functions'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new MonitoredEndpointRepo()
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

beforeAll(async () => {
    connect()
    await userRepo.register(owner1)
    await userRepo.register(owner2)
})

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
    await userRepo.delete(owner1.id)
    await userRepo.delete(owner2.id)
})

describe(`${testKeyPrefix}`, () => {
    let endpoint1: MonitoredEndpoint, endpoint2: MonitoredEndpoint
    beforeEach(() => {
        endpoint1 = new MonitoredEndpoint(
            1,
            'test',
            'http://test.com/',
            new Date(),
            new Date(),
            120,
            owner1
        )
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
    describe(`getByID`, () => {
        describe('When authorized User is trying to access non-existing endpoint', () => {
            test(`Then Error 'This User doesnt have access to this endpoint' will be Thrown`, async () => {
                await expect(repo.getByID(1, owner1.id)).rejects.toThrow(
                    new Error('This User doesnt have access to this endpoint')
                )
            })
        })
        describe('When unauthorized User is trying to access non-existing endpoint', () => {
            test(`Then Error 'This User doesnt have access to this endpoint' will be Thrown`, async () => {
                await expect(repo.getByID(1, 12)).rejects.toThrow(
                    new Error('This User doesnt have access to this endpoint')
                )
            })
        })
        describe('When unauthorized User is trying to access existing endpoint', () => {
            test(`Then Error 'This User doesnt have access to this endpoint' will be Thrown`, async () => {
                await repo.create(endpoint1)
                await expect(repo.getByID(endpoint1.id, owner2.id)).rejects.toThrow(
                    'This User doesnt have access to this endpoint'
                )
            })
        })
    })
    describe('getAll', () => {
        describe('When User has no endpoints', () => {
            test(`Then response is empty array`, async () => {
                const expected = await repo.getAll(owner1.id)

                expect(expected.length).toBe(0)
                expect(expected).toMatchObject([])
            })
        })
        describe('When User has few endpoints and another User has other endpoints', () => {
            test(`Then response is array with only endpoints belonging to authorized User`, async () => {
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

                const expected = await repo.getAll(owner1.id)
                const expected2 = await repo.getAll(owner2.id)

                expect(expected.length).toBe(2)
                expect(expected2.length).toBe(1)
            })
        })
    })
    describe('create', () => {
        describe('When authenticated User is trying to create new endpoint', () => {
            describe('With valid input data inside request body', () => {
                test(`Then created endpoint have to contain same owner`, async () => {
                    const expected = await repo.create(endpoint1)
                    expect(expected.owner).toEqual(endpoint1.owner.id)
                })
            })
            describe('With invalid url input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const expected = endpoint1
                    expected.url = 'test'

                    await expect(repo.create(endpoint1)).rejects.toThrowError(
                        'Validation error'
                    )
                })
            })
            describe('With invalid monitoredInterval input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    endpoint1.monitoredInterval = 120.255
                    await expect(repo.create(endpoint1)).rejects.toThrowError(
                        'Validation error: Validation isInt on monitoredInterval failed'
                    )
                    endpoint2.monitoredInterval = 2
                    await expect(repo.create(endpoint2)).rejects.toThrowError(
                        'Validation error: Validation min on monitoredInterval failed'
                    )
                })
            })
        })
    })
    describe('update', () => {
        describe('When authenticated User is trying to update endpoint', () => {
            describe('With valid input data inside request body', () => {
                test(`Then updated endpoint have to contain updated data`, async () => {
                    const oldEndpoint = endpoint1
                    await repo.create(oldEndpoint)

                    const newEndpoint = endpoint1
                    newEndpoint.monitoredInterval = 10

                    const expected = await repo.update(oldEndpoint.id, newEndpoint)
                    const updated = await repo.getByID(oldEndpoint.id, owner1.id)

                    expect(expected).toBeTruthy()
                    expect(updated.monitoredInterval).toEqual(newEndpoint.monitoredInterval)
                })
            })
            describe('With invalid URL input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const oldEndpoint = endpoint1
                    await repo.create(oldEndpoint)

                    // bad url
                    const newEndpoint = endpoint1
                    newEndpoint.url = 'test'

                    await expect(
                        repo.update(oldEndpoint.id, newEndpoint)
                    ).rejects.toThrowError('Validation error')
                })
            })
            describe('With invalid monitoredInterval input', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    const oldEndpoint = endpoint1
                    await repo.create(oldEndpoint)

                    // Monitored Interval smaller than 5
                    const newEndpoint = endpoint1
                    newEndpoint.monitoredInterval = 2

                    await expect(
                        repo.update(oldEndpoint.id, newEndpoint)
                    ).rejects.toThrowError()
                })
            })
        })
    })
    describe('delete', () => {
        describe('When authorized User is trying to delete non-existing endpoint', () => {
            test(`Then Error 'This User doesnt have access to this endpoint' will be Thrown`, async () => {
                await expect(repo.delete(1, owner1.id)).rejects.toThrowError()
            })
        })
        describe('When unauthorized User is trying to delete existing endpoint', () => {
            test(`Then Error 'This User doesnt have access to this endpoint' will be Thrown`, async () => {
                await repo.create(endpoint1)
                await expect(repo.delete(endpoint1.id, owner2.id)).rejects.toThrowError()
            })
        })
    })
})
