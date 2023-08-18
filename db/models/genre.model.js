const { Model, DataTypes } = require('sequelize');

const GENRE_TABLE = 'genres';

const GenreModel = {
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
    name: {
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
};

class Genre extends Model {
    static associate(models) {
        this.belongsToMany(models.Media, {
            as: 'films',
            through: models.GenreMedia,
            foreignKey: 'genreId',
            otherKey: 'mediaId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: GENRE_TABLE,
            modelName: 'Genre',
            timestamps: true
        }
    }
}

module.exports = { Genre, GenreModel, GENRE_TABLE }