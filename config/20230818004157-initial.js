'use strict';

const { USER_TABLE, UserModel } = require('../db/models/user.model.js');
const { MEDIA_TABLE, MediaModel } = require('../db/models/media.model.js');
const { CHARACTER_TABLE, CharacterModel } = require('../db/models/character.model.js');
const { CHARACTER_MEDIA_TABLE, CharacterMediaModel } = require('../db/models/character-media.model.js');
const { GENRE_TABLE, GenreModel } = require('../db/models/genre.model.js');
const { GENRE_MEDIA_TABLE, GenreMediaModel } = require('../db/models/genre-media.mode.js');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserModel);
    await queryInterface.createTable(MEDIA_TABLE, MediaModel);
    await queryInterface.createTable(CHARACTER_TABLE, CharacterModel);
    await queryInterface.createTable(CHARACTER_MEDIA_TABLE, CharacterMediaModel);
    await queryInterface.createTable(GENRE_TABLE, GenreModel);
    await queryInterface.createTable(GENRE_MEDIA_TABLE, GenreMediaModel);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(MEDIA_TABLE);
    await queryInterface.dropTable(CHARACTER_TABLE);
    await queryInterface.dropTable(CHARACTER_MEDIA_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
    await queryInterface.dropTable(GENRE_MEDIA_TABLE);
  }
};
