const express = require('express');
const passport = require('passport');
const multer = require('multer');

const GenreService = require('./../services/genre.service');

const router = express.Router();
const service = new GenreService();

const storage = multer.diskStorage({
    destination: 'public/genres',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

/**
 * @swagger
 * /api/genres:
 *   post:
 *     tags: [Genres]
 *     summary: REQUIERE DE AUTENTICACIÓN CON TOKEN JWT
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               name: Fiction 
 *               imageFile: route/imagen.jpg
 */
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

/**
 * @openapi
 * /api/genres:
 *   get:
 *     tags:
 *       - Genres
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get('/',
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