const validarBodyMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body,{ abortEarly: false }); // Para obtener todos los errores de validación
    if (error) {
      return res.status(400).json({ mensaje: "Datos incorrectos", error: error});
    }
    req.validatedBody = value;
    next();
  };
};

export default validarBodyMiddleware;