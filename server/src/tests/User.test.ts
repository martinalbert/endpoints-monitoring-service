import request from 'supertest'
import jwt from 'jsonwebtoken'

import config from '../config'
import server from '../app'

import User from '../entities/User'
import UserRepo from '../db/repos/mysql/user_mysql_repo'

const testSuiteName = 'User rest-api endpoint'
const testKeyPrefix = `test:${testSuiteName}`

const repo = new UserRepo()
// test users
const user1 = new User(
    1,
    'Applifting',
    'info@applifting.cz',
    '93f39e2f-80de-4033-99ee-249d92736a25'
)
const user2 = new User(
    2,
    'Batman',
    'batman@example.com',
    'dcb20f8a-5657-4f1b-9f7f-ce65739b359e'
)

afterEach(async () => {
    const users = await repo.getAll()
    for (const user of users) {
        await repo.delete(user.id)
    }
})

describe('POST /user/register', () => {
    describe('When user is trying to register with invalid input data', () => {
        describe('When email input is invalid', () => {
            test(`Then response is 500 InternalServerError - SequelizeValidationError`, async () => {
                const response = await request(server)
                    .post('/user/register')
                    .set('content-type', 'application/json')
                    .send({
                        userName: 'test',
                        email: 'test.com',
                        pw: 'testpassword',
                    })
                expect(response.status).toBe(500)
                expect(response.body.code).toBe('InternalServer')
                expect(response.body.message).toBe(
                    'caused by SequelizeValidationError: Validation error: Validation isEmail on email failed'
                )
            })
        })
        describe('When userName input is shorter that 3 characters', () => {
            test(`Then response is 500 InternalServerError - SequelizeValidationError`, async () => {
                const response = await request(server)
                    .post('/user/register')
                    .set('content-type', 'application/json')
                    .send({
                        userName: 't',
                        email: 'test@test.com',
                        pw: 'testpassword',
                    })
                expect(response.status).toBe(500)
                expect(response.body.code).toBe('InternalServer')
                expect(response.body.message).toBe(
                    'caused by SequelizeValidationError: Validation error: Validation len on userName failed'
                )
            })
        })
        describe('When accessToken input is shorter than 10 characters', () => {
            test(`Then response is 500 InternalServerError - SequelizeValidationError`, async () => {
                const response = await request(server)
                    .post('/user/register')
                    .set('content-type', 'application/json')
                    .send({
                        userName: 'test',
                        email: 'test@test.com',
                        pw: 'test',
                    })
                expect(response.status).toBe(500)
                expect(response.body.code).toBe('InternalServer')
                expect(response.body.message).toBe(
                    'caused by SequelizeValidationError: Validation error: Validation len on accessToken failed'
                )
            })
        })
    })
})

describe('POST /user/login', () => {
    let user: User
    beforeEach(async () => {
        user = await repo.register(user1)
    })
    describe('When registered User is trying to login', () => {
        test(`Then token with just his ID and Email is returned`, async () => {
            const response = await request(server)
                .post('/user/login')
                .set('content-type', 'application/json')
                .send({
                    email: user.email,
                    pw: user.accessToken,
                })
            expect(response.status).toBe(200)

            const expected = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
                expiresIn: '15m',
            })
            expect(response.body.dto).toBe(expected)

            const expectedDecoded = <any>jwt.verify(response.body.dto, config.JWT_SECRET)
            expect(expectedDecoded).toHaveProperty('id')
            expect(expectedDecoded).toHaveProperty('email')
            expect(expectedDecoded).not.toHaveProperty('pw')
            expect(expectedDecoded).not.toHaveProperty('accessToken')
            expect(expectedDecoded.id).toBe(user.id)
            expect(expectedDecoded.email).toBe(user.email)
        })
    })
    describe('When registered User is trying to login with invalid password', () => {
        test(`Then response is 500 Login process failed`, async () => {
            const response = await request(server)
                .post('/user/login')
                .set('content-type', 'application/json')
                .send({
                    email: user.email,
                    pw: 'testtest',
                })
            expect(response.status).toBe(500)
            expect(response.body.code).toBe('InternalServer')
            expect(response.body.message).toBe('caused by Error: Login process failed.')
        })
    })
    describe('When registered User is trying to login with invalid email', () => {
        test(`Then response is 500 Login process failed`, async () => {
            const response = await request(server)
                .post('/user/login')
                .set('content-type', 'application/json')
                .send({
                    email: 'test@test.com',
                    pw: user.accessToken,
                })
            expect(response.status).toBe(500)
            expect(response.body.code).toBe('InternalServer')
            expect(response.body.message).toBe('caused by Error: Login process failed.')
        })
    })
    describe('When not registered User is trying to login', () => {
        test(`Then response is 500 Login process failed`, async () => {
            const response = await request(server)
                .post('/user/login')
                .set('content-type', 'application/json')
                .send({
                    email: 'test@test.com',
                    pw: user.accessToken,
                })
            expect(response.status).toBe(500)
            expect(response.body.code).toBe('InternalServer')
            expect(response.body.message).toBe('caused by Error: Login process failed.')
        })
    })
})

describe('GET /users', () => {
    let token: string
    describe('When user is not authenticated', () => {
        test(`Then response is 401 UnauthorizedError`, async () => {
            const response = await request(server)
                .get('/users')
                .set('authorization', 'Bearer test')

            expect(response.status).toBe(401)
            expect(response.body.code).toBe('Unauthorized')
            expect(response.body.message).toBe('You have no access')
        })
    })
    describe('When there are no users registered', () => {
        test(`Then not even login will work`, async () => {
            await expect(repo.login(user1.email, user1.accessToken)).rejects.toThrowError(
                'Login process failed.'
            )
            token = 'token' // token should be provided through login

            const response = await request(server)
                .get('/users')
                .set('authorization', `Bearer ${token}`)

            expect(response.status).toBe(401)
            expect(response.body.code).toBe('Unauthorized')
            expect(response.body.message).toBe('You have no access')
        })
    })
    describe('When there are few users', () => {
        test(`Then we get all users that got registered`, async () => {
            const userA = await repo.register(user1)
            const userB = await repo.register(user2)

            const user = <any>await repo.login(userA.email, userA.accessToken)
            token = jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, {
                expiresIn: '15m',
            })

            const response = await request(server)
                .get('/users')
                .set('authorization', `Bearer ${token}`)

            expect(response.status).toBe(200)
            expect(response.body.dto.length).toBe(2)
            expect(response.body.dto).toMatchObject([user1, user2])
        })
    })
})
