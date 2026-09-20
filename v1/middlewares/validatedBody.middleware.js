const validarBodyMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body ?? {}, { abortEarly: false });
    
    if (error) {
      return res.status(400).json({ message: "Datos incorrectos", details: error.details.map(d => d.message)  });
    }
    
    req.validatedBody = value;
    next();
  };
};

export default validarBodyMiddleware;