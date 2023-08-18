'use strict';

const { GENRE_MEDIA_TABLE, GenreMediaModel } = require('../models/genre-media.model');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(GENRE_MEDIA_TABLE, GenreMediaModel);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(GENRE_MEDIA_TABLE);

  }
};
