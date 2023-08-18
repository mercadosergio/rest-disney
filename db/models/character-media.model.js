const { Model, DataTypes } = require('sequelize');
const { CHARACTER_TABLE } = require('./character.model');
const { MEDIA_TABLE } = require('./media.model');

const CHARACTER_MEDIA_TABLE = 'characters_medias';

const CharacterMediaModel = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    mediaId: {
        field: 'media_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: MEDIA_TABLE,
            key: 'id'
        },
    },
    characterId: {
        field: 'character_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CHARACTER_TABLE,
            key: 'id'
        },
    },
};

class CharacterMedia extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CHARACTER_MEDIA_TABLE,
            modelName: 'CharacterMedia',
            timestamps: false
        }
    }
}

module.exports = { CharacterMedia, CharacterMediaModel, CHARACTER_MEDIA_TABLE }