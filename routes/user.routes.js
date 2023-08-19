const express = require('express');
const passport = require('passport');

const UserService = require('./../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
// const { checkRoles } = require('./../middlewares/auth.handler');

const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/',
    // passport.authenticate('jwt', { session: false }),
    // checkRoles('admin'),
    async (req, res, next) => {
        try {
            const users = await service.find();
            res.json(users);
        } catch (error) {
            next(error);
        }
    });

router.get('/:id',
    // passport.authenticate('jwt', { session: false }),
    // checkRoles('admin'),
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;