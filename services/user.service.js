const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UserService {

    constructor() { }

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        try {
            const newUser = await models.User.create({
                ...data,
                password: hash
            });
            return newUser;
        } catch (error) {
            throw error;
        }
    }


    async find() {
        const users = await models.User.findAll({
            attributes: { exclude: ['password', 'username'] },
            include: [
                {
                    model: models.Role,
                    as: 'role',
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                }
            ],
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

    async update(id, changes) {
        try {
            const user = await this.findOne(id);

            if (user) {
                const editedUser = await user.update(changes);
                return editedUser;
            } else {
                throw new Error('Usuario no encontrado');
            }
        }
        catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await user.destroy();
            return { id };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
