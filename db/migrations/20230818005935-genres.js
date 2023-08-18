'use strict';

const { GENRE_TABLE, GenreModel } = require('../models/genre.model');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(GENRE_TABLE, GenreModel);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(GENRE_TABLE);

  }
};
