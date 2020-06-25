export default {
    ENV: process.env.NODE_ENV || 'development',
    RESTAPI_URL: process.env.RESTAPI_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
}
