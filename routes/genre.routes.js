const express = require('express');
const passport = require('passport');
const multer = require('multer');

const GenreService = require('./../services/genre.service');
const validatorHandler = require('./../middlewares/validator.handler');

const router = express.Router();
const service = new GenreService();

const storage = multer.diskStorage({
    destination: 'public/genres',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single('imageFile'),
    async (req, res, next) => {
        try {
            const body = req.body;
            console.log(req.file);
            const uploadedFile = await service.create(body, req.file);
            res.status(201).json(uploadedFile);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    // validatorHandler(queryProductSchema, 'query'),
    async (req, res, next) => {
        try {
            const genres = await service.find();
            res.json(genres);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;