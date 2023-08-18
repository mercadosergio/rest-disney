require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,

    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
}

module.exports = { config };