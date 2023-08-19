const express = require('express');
const passport = require('passport');
const multer = require('multer');

const CharacterService = require('../services/character.service');
const validatorHandler = require('../middlewares/validator.handler');

const { getCharacterSchema } = require('./../schemas/character.schema');


const router = express.Router();
const service = new CharacterService();

const storage = multer.diskStorage({
    destination: 'public/characters',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.get('/',
    async (req, res) => {
        try {
            const characters = await service.find(req.query);
            res.status(200).json(characters);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

router.get('/:id',
    validatorHandler(getCharacterSchema, 'params'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const character = await service.findOne(id);
            res.status(200).json(character);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single('characterImage'),
    async (req, res) => {
        try {
            const body = req.body;
            const ceatedCharacter = await service.create(body, req.file);
            res.status(201).json(ceatedCharacter);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.post('/asign-character',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        try {
            const body = req.body;
            const asigned = await service.asignToMovie(body);
            res.status(201).json(asigned);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

router.put('/:id',
    validatorHandler(getCharacterSchema, 'params'),
    upload.single('characterImage'),
    async (req, res) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const character = await service.update(id, body, req.file);
            res.status(200).json(character);
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
            res.json({ id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;