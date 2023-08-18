'use strict';

const { MEDIA_TABLE, MediaModel } = require('../models/media.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(MEDIA_TABLE, MediaModel);

  },

  async down (queryInterface, Sequelize) {
       await queryInterface.dropTable(MEDIA_TABLE);

  }
};
