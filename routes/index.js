const { Router } = require('express');

const characterRoutes = require('./character.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

function routerApi(app) {
    const router = Router();
    app.use('/api', router);
    router.use('/auth', authRoutes);
    router.use('/characters', characterRoutes);
    router.use('/users', userRoutes);
}

module.exports = routerApi;