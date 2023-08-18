const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('../libs/sequelize');

const { config } = require('./../config/environment');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

    async register(data) {
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

    async getUser(email, password) {
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        };
        const access_token = jwt.sign(payload, config.jwtSecret);
        console.log(access_token);
        return {
            access_token
        };
    }

    async validateEmail(email) {

        if (String(email)
            .toLowerCase()
            .match(/^([a-z\d\.-]+)@([a-z\d-]+).([a-z]{2,12})(\.[a-z]{2,12})$/)) {

            return {
                isAvailable: true,
            };
        } else {
            return {
                isAvailable: false,
            };
        }
    }

    async getUserProfile(userId) {
        const user = await models.User.findByPk(userId);
        if (!user) {
            throw boom.notFound('user not found');
        }
        delete user.dataValues.password;
        return user;
    }

    async getCustomerByUserId(userId) {
        const customer = await models.Customer.findOne({ where: { userId: userId } });
        if (!customer) {
            throw boom.notFound('customer not found');
        }
        return customer;
    }
}

module.exports = AuthService;