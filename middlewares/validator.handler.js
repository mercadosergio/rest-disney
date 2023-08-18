function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];

        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            const validationErrors = error.details.map((errorDetail) => errorDetail.message);
            return res.status(400).json({ error: 'Datos inválidos', details: validationErrors });
        }
        next();
    };
}

module.exports = validatorHandler;
