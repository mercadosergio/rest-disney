const { Model, DataTypes } = require('sequelize');

const CHARACTER_TABLE = 'characters';

const CharacterModel = {
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
    age: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    weight: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    history: {
        allowNull: false,
        type: DataTypes.STRING(1000),
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

class Character extends Model {
    static associate(models) {
        this.belongsToMany(models.Media, {
            as: 'films',
            through: models.CharacterMedia,
            foreignKey: 'characterId',
            otherKey: 'mediaId',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CHARACTER_TABLE,
            modelName: 'Character',
            timestamps: true,
            paranoid: true,
        }
    }
}

module.exports = { Character, CharacterModel, CHARACTER_TABLE }