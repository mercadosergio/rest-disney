const { config } = require('./../config/environment');

module.exports = {
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'mysql',
}

