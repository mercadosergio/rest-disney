const { models } = require('../libs/sequelize');

class CharacterService {

    constructor() { }

    async create(data, file) {
        try {
            const { path } = file;

            const newData = {
                ...data,
                image: path,
            }
            const newCharacter = await models.Character.create(newData);
            return newCharacter;
        } catch (error) {
            throw error;
        }
    }

    async asignToMovie(data) {
        try {
            const asignedCharacter = await models.CharacterMedia.create(data);
            return asignedCharacter;
        } catch (error) {
            throw error;
        }
    }

    async find(query) {
        const options = {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'id', 'age', 'weight', 'history'] },
            where: { deletedAt: null }
        };

        // Filtro por nombre
        const { name } = query;
        if (name) {
            options.where.name = {
                [Op.like]: `%${name}%`
            };
        }

        // Filtro por edad
        const { age } = query;
        if (age) {
            options.where.age = age;
        }

        // Filtro por peliculas/series
        const { movies } = query;
        if (movies) {
            options.include = [{
                model: models.Media,
                where: { id: movies }
            }];
        }

        const characters = await models.Character.findAll(options);
        return characters;
    }

    async findOne(id) {
        const character = await models.Character.findByPk(id, {
            include: [
                {
                    model: models.Media,
                    as: 'films',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
                }
            ],
        });
        if (!character) {
            throw new Error('character not found');
        }
        return character;
    }

    async update(id, changes, file) {
        try {
            const imagePath = file.path;

            const updateData = {
                ...changes,
                image: imagePath,
            }

            const character = await this.findOne(id);
            if (character) {
                if (character.image.startsWith("http://") || character.image.startsWith("https://")) {
                    return;
                } else {
                    const updatedCharacter = await character.update(updateData);
                    delete updatedCharacter.dataValues.deletedAt;
                    return updatedCharacter;
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
        try {
            const character = await this.findOne(id);
            if (!character) {
                throw new Error('character no encontrado');
            }
            await character.destroy();
            return { id };
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        const character = await this.findOne(id);

        if (!character) {
            throw boom.notFound('character not found');
        }

        const filePath = path.join(__dirname, '..', character.image);
        await character.destroy();
        if (character.image.startsWith("http://") || character.image.startsWith("https://")) {
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

module.exports = CharacterService;