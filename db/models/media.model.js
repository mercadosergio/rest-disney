const { Model, DataTypes } = require('sequelize');

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
        type: DataTypes.INTEGER,
    },
    category: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
};

class Media extends Model {
    static associate(models) {
        this.belongsToMany(models.Character, {
            as: 'characters',
            through: models.CharacterMedia,
            foreignKey: 'mediaId',
            otherKey: 'characterId',
        });
        this.belongsToMany(models.Genre, {
            as: 'genres',
            through: models.GenreMedia,
            foreignKey: 'mediaId',
            otherKey: 'genreId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: MEDIA_TABLE,
            modelName: 'Media',
            timestamps: true
        }
    }
}

module.exports = { Media, MediaModel, MEDIA_TABLE }