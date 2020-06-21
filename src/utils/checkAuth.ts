import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'
import jwt from 'jsonwebtoken'
import config from '../config'

export default (req: Request, res: Response, next: Next) => {
    let decoded

    try {
        const token = req.header('authorization').split(' ')[1]
        decoded = <any>jwt.verify(token, config.JWT_SECRET)

        const { id, email } = decoded
        req.user = { id, email }
    } catch (error) {
        return next(new errors.UnauthorizedError('You have no access'))
    }

    // token expires in 15min, get new token an every request
    // const { id, email } = decoded
    // const token = jwt.sign({ uid: { id, email } }, config.JWT_SECRET, {
    //     expiresIn: '15m',
    //     algorithm: 'HS256',
    // })
    // res.setHeader('Authorization', token)

    next()
}
