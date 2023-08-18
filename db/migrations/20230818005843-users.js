'use strict';

const { USER_TABLE, UserModel } = require('../models/user.model');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserModel);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);

  }
};
