const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.service');

const { createUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new AuthService();

router.post('/register',
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newUser = await service.register(body);
            res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            res.json(service.signToken(user));
        } catch (error) {
            next(error);
        }
    }
);

router.post('/is-available',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const rta = await service.validateEmail(email);
            res.json(rta)
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
