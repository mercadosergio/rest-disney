'use strict';

const { MEDIA_TABLE } = require('../models/media.model');
const { GENRE_TABLE } = require('../models/genre.model');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(GENRE_TABLE, [
      {
        id: 1,
        name: 'Fantasía',
        image: 'public\\genres\\fantasy.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Acción',
        image: 'public\\genres\\action.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Drama',
        image: 'public\\genres\\drama.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: 'Musical',
        image: 'public\\genres\\musical.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: 'Aventura',
        image: 'public\\genres\\aventure.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        name: 'Animación',
        image: 'public\\genres\\animation.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        name: 'Comedia',
        image: 'public\\genres\\comedy.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        name: 'Ciencia ficción',
        image: 'public\\genres\\fiction.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        name: 'Comedia romántica',
        image: 'public\\genres\\romance_comedy.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        name: 'Género musical',
        image: 'public\\genres\\musical_gender.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    function getRandomRating() {
      return Math.floor(Math.random() * 5) + 1;
    }

    function getRandomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    await queryInterface.bulkInsert(MEDIA_TABLE,
      [
        {
          id: 1,
          title: 'Fantasía',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\fantasia.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 2,
          title: 'Piratas del Caribe: La maldición del Perla Negra',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\pirates_of_caribean.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 5,
        },
        {
          id: 3,
          title: 'El Rey León',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\lion_king.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 6,
        },
        {
          id: 4,
          title: 'La Bella y la Bestia',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\beauty_beast.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 5,
          title: 'Pocahontas',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\pocahontas.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 5,
        },
        {
          id: 6,
          title: 'Aladdin',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\aladdin.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 10,
        },
        {
          id: 7,
          title: 'Frozen: Una aventura congelada',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\frozen.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 8,
          title: 'Toy Story',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\toy_story.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 7,
        },
        {
          id: 9,
          title: 'Enredados',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\enredados.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 10,
        },
        {
          id: 10,
          title: 'Hércules',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\hercules.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 5,
        },
        {
          id: 11,
          title: 'Ratatouille',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\rata.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 6,
        },
        {
          id: 12,
          title: 'Up',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\up.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 13,
          title: 'Mulan',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\mulan.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 3,
        },
        {
          id: 14,
          title: 'Phineas y Ferb',
          category: 'Serie',
          rating: getRandomRating(),
          image: 'public\\genres\\phineas_ferb.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 5,
        },
        {
          id: 15,
          title: 'The Avengers',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\avengers.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 8,
        },
        {
          id: 16,
          title: 'Capitán América: El soldado del invierno',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\captain_america.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 8,
        },
        {
          id: 17,
          title: 'Loki',
          category: 'Serie',
          rating: getRandomRating(),
          image: 'public\\genres\\loki.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 2,
        },
        {
          id: 18,
          title: 'Hannah Montana',
          category: 'Serie',
          rating: getRandomRating(),
          image: 'public\\genres\\hannah.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 7,
        },
        {
          id: 19,
          title: 'El principe de Persia',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\prince_persia.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 20,
          title: 'Wall-E',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\walle.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 1,
        },
        {
          id: 21,
          title: 'Zack y Cody: Gemelos en acción',
          category: 'Serie',
          rating: getRandomRating(),
          image: 'public\\genres\\zack_cody.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 7,
        },
        {
          id: 22,
          title: 'La Dama y el Vagabundo',
          category: 'Película',
          rating: getRandomRating(),
          image: 'public\\genres\\dama_vagabundo.jpg',
          created_at: getRandomDate(currentDate, oneYearAgo),
          updated_at: new Date(),
          genre_id: 9,
        },
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(MEDIA_TABLE, null, {});
    await queryInterface.bulkDelete(GENRE_TABLE, null, {});
    await queryInterface.sequelize.query('ALTER TABLE ' + MEDIA_TABLE + ' AUTO_INCREMENT = 0');
    await queryInterface.sequelize.query('ALTER TABLE ' + GENRE_TABLE + ' AUTO_INCREMENT = 0');
  }
};
