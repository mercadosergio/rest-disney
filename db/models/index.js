const { CharacterMedia, CharacterMediaModel } = require('./character-media.model');
const { Character, CharacterModel } = require('./character.model');
const { GenreMedia, GenreMediaModel } = require('./genre-media.model');
const { Genre, GenreModel } = require('./genre.model');
const { Media, MediaModel } = require('./media.model');
const { User, UserModel } = require('./user.model');

function setupModels(sequelize) {
    User.init(UserModel, User.config(sequelize));
    Media.init(MediaModel, Media.config(sequelize));
    Character.init(CharacterModel, Character.config(sequelize));
    CharacterMedia.init(CharacterMediaModel, CharacterMedia.config(sequelize));
    Genre.init(GenreModel, Genre.config(sequelize));
    GenreMedia.init(GenreMediaModel, GenreMedia.config(sequelize));

    User.associate(sequelize.models);
    Media.associate(sequelize.models);
    Character.associate(sequelize.models);
    Genre.associate(sequelize.models);
}

module.exports = setupModels;