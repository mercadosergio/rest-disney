const express = require('express');
const passport = require('passport');
const multer = require('multer');

const MovieService = require('./../services/movie.service');
// const validatorHandler = require('./../middlewares/validator.handler');
// const { getProductImageSchema, updateProductImageSchema, addImageSchema } = require('./../schemas/products.schemas');
const fs = require('fs');

const router = express.Router();
const service = new MovieService();

const storage = multer.diskStorage({
    destination: 'public/movies',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single('movieImage'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const createdMovie = await service.create(body, req.file);
            res.status(201).json(createdMovie);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    // validatorHandler(queryProductSchema, 'query'),
    async (req, res, next) => {
        try {
            const productImages = await service.find(req.query);
            res.json(productImages);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id',
    // validatorHandler(getProductImageSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const productImage = await service.findOne(id);
            res.json(productImage);
        } catch (error) {
            next(error);
        }
    }
);

router.put('/:id',
    // validatorHandler(getProductImageSchema, 'params'),
    // validatorHandler(updateProductImageSchema, 'body'),
    upload.single('movieImage'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const productImage = await service.update(id, body, req.file);
            res.json(productImage);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    // validatorHandler(getProductImageSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.json({ id });
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;