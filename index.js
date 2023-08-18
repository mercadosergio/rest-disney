const express = require('express');
const routerApi = require('./routes');

const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
require('./utils/auth');

app.get('/api', (req, res) => {
    res.send('API REST IS WORKING');
});

routerApi(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});