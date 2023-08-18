const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api', (req, res) => {
    res.send('API REST IS WORKING');
});

routerApi(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});