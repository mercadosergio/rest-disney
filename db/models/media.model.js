const { Model, DataTypes } = require('sequelize');
const { GENRE_TABLE } = require('./genre.model');

const MEDIA_TABLE = 'medias';

const MediaModel = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    rating: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
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

class Media extends Model {
    static associate(models) {
        this.belongsTo(models.Genre,
            { as: 'genre' }
        );

        this.belongsToMany(models.Character, {
            as: 'characters',
            through: models.CharacterMedia,
            foreignKey: 'mediaId',
            otherKey: 'characterId',
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: MEDIA_TABLE,
            modelName: 'Media',
            timestamps: true,
            paranoid: true,
        }
    }
}

module.exports = { Media, MediaModel, MEDIA_TABLE }