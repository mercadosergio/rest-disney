const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const fs = require('fs');
const path = require('path');

class MovieService {

    constructor() { }

    async create(data, file) {
        try {
            const { path } = file;

            const newData = {
                ...data,
                image: path,
            }
            const movieData = await models.Media.create(newData);
            return movieData;
        } catch (error) {
            throw error;
        }
    }

    async find(query) {
        const options = {
            attributes: { exclude: ['updatedAt', 'id', 'category', 'rating'] },
            where: { deletedAt: null }
        };

        // Filtro por titulo
        const { title } = query;
        if (title) {
            options.where.title = {
                [Op.like]: `%${title}%`
            };
        }

        // Filtro por genero
        const { genre } = query;
        if (genre) {
            options.where.genreId = genre;
        }

        // Filtro por fecha de creación
        const { order } = query;
        if (order && (order === 'ASC' || order === 'DESC')) {
            options.order = [['createdAt', order]];
        }

        const movies = await models.Media.findAll(options);
        return movies;
    }

    async findOne(id) {
        const movie = await models.Media.findByPk(id, {
            attributes: { exclude: ['updatedAt', 'deletedAt'] },
            include: [
                {
                    model: models.Character,
                    as: 'characters',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
            ],
        });
        if (!movie) {
            throw new Error('movie not found');
        }
        return movie;
    }

    async update(id, changes, file) {
        try {
            const imagePath = file.path;

            const updateData = {
                ...changes,
                image: imagePath,
            }

            const movie = await this.findOne(id);
            if (movie) {
                if (movie.image.startsWith("http://") || movie.image.startsWith("https://")) {
                    return;
                } else {
                    const updatedMovie = await movie.update(updateData);
                    delete updatedMovie.dataValues.deletedAt;
                    return updatedMovie;
                }
            } else {
                throw new Error('movie no encontrado');
            }
        }
        catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const movie = await this.findOne(id);

        if (!movie) {
            throw boom.notFound('Movie not found');
        }

        const filePath = path.join(__dirname, '..', movie.image);
        await movie.destroy();
        if (movie.image.startsWith("http://") || movie.image.startsWith("https://")) {
            return;
        } else {
            return await new Promise((resolve, reject) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                        reject(err);
                        return;
                    }
                    resolve();
                });
            })
        }
    }
}

module.exports = MovieService;