const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://myapp.co', 'http://localhost:3000/api/docs']; //TODO: COLOCAR EN EL ARRAY LAS URL DE LOS CLIENTES WEB PARA CONSUMIR LA API SIN PROBLEMAS DE CORS
const options = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin)) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}
app.use(cors(options));

require('./utils/auth');

app.get('/api', (req, res) => {
    res.send('API REST IS WORKING');
});

routerApi(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});