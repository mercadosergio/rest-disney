const { models } = require('../libs/sequelize');

class CharacterService {

    constructor() { }

    async create(data) {
        try {
            const newCharacter = await models.Character.create(data);
            return newCharacter;
        } catch (error) {
            throw error;
        }
    }

    async find() {
        const characters = await models.Character.findAll();
        return characters;
    }

    async findOne(id) {
        const character = await models.Character.findByPk(id);
        if (!character) {
            throw new Error('character not found');
        }
        return character;
    }

    async update(id, changes) {
        try {
            const character = await this.findOne(id);
            if (character) {
                const editedCharacter = await character.update(changes);
                return editedCharacter;
            } else {
                throw new Error('character no encontrado');
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
}

module.exports = CharacterService;