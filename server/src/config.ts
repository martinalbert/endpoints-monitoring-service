export default {
    ENV: process.env.NODE_ENV || 'development',
    URL: process.env.BASE_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 3000,
    CURRENT_DATABASE: process.env.CURRENT_DATABASE || 'mysql',
    MYSQL_URL: process.env.MYSQL_URL || 'localhost',
    MYSQL_PORT: process.env.MYSQL_PORT || 8889,
    MYSQL_DB: process.env.MYSQL_DB || 'database',
    MYSQL_USER: process.env.MYSQL_USER || 'root',
    MYSQL_PW: process.env.MYSQL_PW || 'root',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123',
    MYSQL_SOCKET: process.env.MYSQL_SOCKET,
}
