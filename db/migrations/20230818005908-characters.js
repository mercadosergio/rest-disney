'use strict';

const { CHARACTER_TABLE, CharacterModel } = require('../models/character.model');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CHARACTER_TABLE, CharacterModel);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(CHARACTER_TABLE);

  }
};
