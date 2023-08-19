const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const AuthService = require('../services/auth.service');

const { createUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new AuthService();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description:
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro exitoso
 *         content:
 *           application/json:
 *             example:
 *               name: "Juan"
 *               email: "juan@mail.com"
 *       500:
 *         description: Error en el servidor
 */

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

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve un token JWT
 *         content:
 *           application/json:
 *             example:
 *               access_token: [TOKEN_JWT]
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
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

/**
 * @swagger
 * /api/auth/is-available:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Es valido o no es valido
 *         content:
 *           application/json:
 *             example:
 *               isAvailable: true
 *       500:
 *         description: Error en el servidor
 */
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
