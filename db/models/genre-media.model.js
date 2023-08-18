const { Model, DataTypes } = require('sequelize');
const { MEDIA_TABLE } = require('./media.model');
const { GENRE_TABLE } = require('./genre.model');

const GENRE_MEDIA_TABLE = 'genres_medias';

const GenreMediaModel = {
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
    genreId: {
        field: 'genre_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: GENRE_TABLE,
            key: 'id'
        },
    },
};

class GenreMedia extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: GENRE_MEDIA_TABLE,
            modelName: 'GenreMedia',
            timestamps: false
        }
    }
}

module.exports = { GenreMedia, GenreMediaModel, GENRE_MEDIA_TABLE }