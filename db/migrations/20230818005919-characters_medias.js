'use strict';

const { CHARACTER_MEDIA_TABLE, CharacterMediaModel } = require('../models/character-media.model');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CHARACTER_MEDIA_TABLE, CharacterMediaModel);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CHARACTER_MEDIA_TABLE);

  }
};
