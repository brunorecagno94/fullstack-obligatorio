const validarParamsMiddleware = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);

        if (error) {
            return res.status(400).json({ mensaje: "Datos incorrectos", error: error });
        }

        req.validatedParams = value;
        next();
    };
};

export default validarParamsMiddleware;