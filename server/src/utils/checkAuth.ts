import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import config from '../config'

/**
 * Middleware Utility \
 * Function that authenticate User by decoding the token inside Authorization Header.
 * It serves as middleware to web frameworks.\
 *
 * @function checkAuth
 * @param  {Request} req - incoming HTTP Request
 * @param  {Response} res - HTTP Response
 * @param  {Next} next - Callback function
 */
const checkAuth = (req: Request, res: Response, next: Next) => {
    let decoded: jwtObject
    try {
        const token = req.header('authorization').split(' ')[1]
        decoded = <jwtObject>jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        return next(new errors.UnauthorizedError('You have no access'))
    }

    if (req.url === '/users') {
        const { user } = decoded
        if (user !== 'root') return next(new errors.UnauthorizedError('You have no access'))
        next()
    } else {
        const { id, email } = decoded
        if (!id || !email) return next(new errors.UnauthorizedError('You have no access'))

        req.user = { id, email }
        next()
    }
}

export default checkAuth
