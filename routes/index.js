const { Router } = require('express');

const characterRoutes = require('./character.routes');
const userRoutes = require('./user.routes');

function routerApi(app) {
    const router = Router();
    app.use('/api', router);
    router.use('/characters', characterRoutes);
    router.use('/users', userRoutes);
}

module.exports = routerApi;