const express = require('express');
const path = require('path');

const characterRoutes = require('./character.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const genreRoutes = require('./genre.routes');
const movieRoutes = require('./movie.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);

    const uploadPath = path.join(__dirname, '../public');
    const genreUploadPath = path.join(uploadPath, 'genres');
    const movieUploadPath = path.join(uploadPath, 'movies');
    const characterUploadPath = path.join(uploadPath, 'characters');

    router.use('/public', express.static(uploadPath));
    router.use('/public/genres', express.static(genreUploadPath));
    router.use('/public/movies', express.static(movieUploadPath));
    router.use('/public/characters', express.static(characterUploadPath));

    router.use('/auth', authRoutes);
    router.use('/genres', genreRoutes);
    router.use('/movies', movieRoutes);
    router.use('/characters', characterRoutes);
    router.use('/users', userRoutes);

    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = routerApi;