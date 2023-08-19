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

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description:
 */


/**
 * @swagger
 * /api/characters:
 *   get:
 *     tags: [Characters]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nombre
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filtro por edad
 *       - in: query
 *         name: movies
 *         schema:
 *           type: string
 *         description: Filtro por pelicula
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
    async (req, res) => {
        try {
            const characters = await service.find(req.query);
            res.status(200).json(characters);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

/**
* @openapi
* /api/characters/{id}:
*   get:
*     tags: [Characters]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID del personaje
*     responses:
*       200:
*         content:
*           application/json:
*             example:
*               status: OK
*       404:
*         description: Personaje no encontrado
*       500:
*         description: Error en el servidor
*/
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
/**
 * @swagger
 * /api/characters:
 *   post:
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               history:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: string
 *               characterImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               name: Pinocho 
 *               history: lorem ipsum amet dolor
 *               age: 0
 *               weight: 5
 *               characterImage: route/imagen.jpg
 */

router.post('/',
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
/**
 * @swagger
 * /api/asign-character:
 *   post:
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: integer
 *               characterId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               mediaId: 1 
 *               characterId: 5
 */
router.post('/asign-character',
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

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     tags: [Characters]
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
 *               name:
 *                 type: string
 *               history:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: string
 *               characterImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               name: Pinocho 
 *               history: lorem ipsum amet dolor
 *               age: 0
 *               weight: 5
 *               movieImage: route/imagen.jpg
 */

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
/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     tags: [Characters]
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