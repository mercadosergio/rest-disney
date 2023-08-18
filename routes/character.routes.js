const { Router } = require('express');
const passport = require('passport');

const CharacterService = require('../services/character.service');
const validatorHandler = require('../middlewares/validator.handler');

const { updateCharacterSchema, createCharacterSchema, getCharacterSchema } = require('./../schemas/character.schema');

const router = Router();
const service = new CharacterService();

router.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const users = await service.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/:id',
    validatorHandler(getCharacterSchema, 'params'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const user = await service.findOne(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.post('/',
    validatorHandler(createCharacterSchema, 'body'),
    async (req, res) => {
        try {
            const body = req.body;
            const createdUser = await service.create(body);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.put('/:id',
    validatorHandler(getCharacterSchema, 'params'),
    validatorHandler(updateCharacterSchema, 'body'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const user = await service.update(id, body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.delete('/:id',
    validatorHandler(getCharacterSchema, 'params'),
    async (req, res) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;