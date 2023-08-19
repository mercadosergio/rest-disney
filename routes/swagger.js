const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    explorer: true,
    definition: {
        openapi: "3.0.0",
        info: { title: "API DISNEY WORLD", version: "1.0.0" },
    },
    components: {
        securitySchemes: {
            jwt: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            },
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;