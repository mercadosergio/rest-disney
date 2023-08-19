const express = require('express');
const passport = require('passport');
const multer = require('multer');

const MovieService = require('./../services/movie.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getMovieSchema, queryMovieSchema } = require('./../schemas/movie.schema');

const router = express.Router();
const service = new MovieService();

const storage = multer.diskStorage({
    destination: 'public/movies',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description:
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               rating:
 *                 type: integer
 *               genreId:
 *                 type: integer
 *               movieImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               title: Ejemplo de Película
 *               category: Película
 *               rating: 4
 *               genreId: 2
 *               movieImage: route/imagen.jpg
 */
router.post('/',
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

/**
 * @openapi
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filtro por título de película
 *       - in: query
 *         name: genre
 *         schema:
 *           type: integer
 *         description: Filtro por género de película
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Ordenar de forma descendente (DESC) o ascendente (ASC) por fecha de creación
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
    validatorHandler(queryMovieSchema, 'query'),
    async (req, res, next) => {
        try {
            const productImages = await service.find(req.query);
            res.json(productImages);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @openapi
 * /api/movies/{id}:
 *   get:
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a obtener
 *     responses:
 *       200:
 *         description: Película obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               status: OK
 *               data:
 *                 id: 123
 *                 title: Ejemplo de Película
 *                 category: Película
 *                 rating: 4
 *                 genreId: 2
 *                 movieImage: route/imagen.jpg
 *       401:
 *         description: No autorizado (token JWT no proporcionado o inválido)
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id',
    validatorHandler(getMovieSchema, 'params'),
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
/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               rating:
 *                 type: integer
 *               genreId:
 *                 type: integer
 *               movieImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               title: Película Actualizada
 *               category: Actualización
 *               rating: 5
 *               genreId: 3
 *               movieImage: route/imagen_actualizada.jpg
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id',
    validatorHandler(getMovieSchema, 'params'),
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

/**
 * @openapi
 * /api/movies/{id}:
 *   delete:
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               status: OK
 *               message: Película eliminada con éxito
 *       401:
 *         description: No autorizado (token JWT no proporcionado o inválido)
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id',
    validatorHandler(getMovieSchema, 'params'),
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