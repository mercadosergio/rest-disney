const { Sequelize } = require('sequelize');

const { config } = require('./../config/environment');
const setupModels = require('./../db/models');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    timezone: config.dbTimezone,
    dialect: 'mysql',
    logging: false
});

setupModels(sequelize);

module.exports = sequelize;