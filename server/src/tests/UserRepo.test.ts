import { connect } from '../db'
import User from '../entities/User'
import UserRepo from '../db/repos/mysql/user_mysql_repo'

const testSuiteName = 'User Repo Functions'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new UserRepo()

beforeAll(async () => {
    connect()
})

afterEach(async () => {
    const users = await repo.getAll()
    for (const user of users) {
        await repo.delete(user.id)
    }
})

describe(`${testKeyPrefix}`, () => {
    let user1: User, user2: User
    beforeEach(() => {
        user1 = new User(
            1,
            'Applifting',
            'info@applifting.cz',
            '93f39e2f-80de-4033-99ee-249d92736a25'
        )
        user2 = new User(
            2,
            'Batman',
            'batman@example.com',
            'dcb20f8a-5657-4f1b-9f7f-ce65739b359e'
        )
    })
    describe('register', () => {
        describe('When user is trying to register with invalid input data', () => {
            describe('When email input is invalid', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    user1.email = 'test'
                    await expect(repo.register(user1)).rejects.toThrowError('Validation error')
                })
            })
            describe('When userName input is shorter that 3 characters', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    user1.userName = 't'
                    await expect(repo.register(user1)).rejects.toThrowError('Validation error')
                })
            })
            describe('When accessToken input is shorter than 10 characters', () => {
                test(`Then response will throw sequelize Error`, async () => {
                    user1.accessToken = 't'
                    await expect(repo.register(user1)).rejects.toThrowError('Validation error')
                })
            })
        })
    })
    describe(`login`, () => {
        beforeEach(async () => {
            await repo.register(user1)
        })
        describe('When registered User is trying to login', () => {
            test(`Then just his ID and Email is returned`, async () => {
                const expectedObject = {
                    id: user1.id,
                    email: user1.email,
                }
                const expected = await repo.login(user1.email, user1.accessToken)
                expect(typeof expected).toBe('object')
                expect(expected).toMatchObject(expectedObject)
            })
        })
        describe('When registered User is trying to login with invalid password', () => {
            test(`Then Error 'Login process failed' will be Thrown`, async () => {
                await expect(repo.login(user1.email, 'badPassword')).rejects.toThrowError(
                    'Login process failed.'
                )
            })
        })
        describe('When registered User is trying to login with invalid email', () => {
            test(`Then Error 'Login process failed' will be Thrown`, async () => {
                await expect(
                    repo.login('bad@email.com', user1.accessToken)
                ).rejects.toThrowError('Login process failed.')
            })
        })
        describe('When not registered User is trying to login', () => {
            test(`Then Error 'Login process failed' will be Thrown`, async () => {
                await expect(repo.login(user2.email, user2.accessToken)).rejects.toThrowError(
                    'Login process failed.'
                )
            })
        })
    })
    describe('getAll', () => {
        describe('When there are no users registered', () => {
            test(`Then response is empty array`, async () => {
                const result = await repo.getAll()
                expect(result.length).toBe(0)
                expect(result).toMatchObject([])
            })
        })
        describe('When there are few users', () => {
            test(`Then we get all users that got registered`, async () => {
                await repo.register(user1)
                await repo.register(user2)

                const result = await repo.getAll()
                expect(result.length).toBe(2)
                expect(result).toMatchObject([user1.toObject(), user2.toObject()])
            })
        })
    })
    describe('getCurent', () => {
        describe('When User who is not registered is trying to get current User', () => {
            test(`Then Error 'User with this ID doesnt exist' will be Thrown`, async () => {
                await expect(repo.getCurrent(user1.id, user1.email)).rejects.toThrowError(
                    'User with this ID doesnt exist'
                )
            })
        })
    })
})
