const express = require('express');

const UserService = require('./../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');

const { getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description:
 */


/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
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
            const users = await service.find();
            res.json(users);
        } catch (error) {
            next(error);
        }
    });

    /**
* @openapi
* /api/users/{id}:
*   get:
*     tags: [Users]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID del usuario
*     responses:
*       200:
*         content:
*           application/json:
*             example:
*               status: OK
*       404:
*         description: Usuario no encontrado
*       500:
*         description: Error en el servidor
*/
router.get('/:id',
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