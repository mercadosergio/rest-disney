const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {

    constructor() { }

    async find() {
        const users = await models.User.findAll({
            attributes: { exclude: ['password'] }
        });
        return users;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id, {
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }

    async findByEmail(email) {
        const user = await models.User.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
}

module.exports = UserService;
