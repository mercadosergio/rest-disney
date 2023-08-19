const { models } = require('./../libs/sequelize');

class GenreService {

    constructor() { }

    async create(data, file) {
        try {
            const { path } = file;

            const newData = {
                ...data,
                image: path,
            }
            const newGenreData = await models.Genre.create(newData);
            return newGenreData;
        } catch (error) {
            throw error;
        }
    }

    async find() {
        const genres = await models.Genre.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: models.Media,
                    as: 'movies',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
        });
        return genres;
    }
}

module.exports = GenreService;