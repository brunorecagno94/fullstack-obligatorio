const validarParamsMiddleware = (schema) => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req.params ?? {}, { abortEarly: false });

		if (error) {
			return res.status(400).json({ message: "Datos incorrectos", details: error.details.map(d => d.message) });
		}

		req.validatedParams = value;
		next();
	};
};

export default validarParamsMiddleware;