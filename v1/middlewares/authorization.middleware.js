const authorizationMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.decoded.rol)) {
      return res.status(403).json({ message: 'No tiene permiso para realizar esta acción' });
    }
    next();
  };
};

export default authorizationMiddleware;