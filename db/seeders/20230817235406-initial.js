'use strict';

const { GENRE_TABLE } = require('./../models/genre.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(GENRE_TABLE, [
      {
        id: 1,
        name: 'Fantasía',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Acción',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Drama',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Musical',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Aventura',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Animación',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Comedia',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Ciencia ficción',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Comedia romántica',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Género musical',
        image: 'image',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(GENRE_TABLE, null, {});
    await queryInterface.sequelize.query('ALTER TABLE ' + GENRE_TABLE + ' AUTO_INCREMENT = 0');
  }
};
