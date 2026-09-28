import jwt from 'jsonwebtoken';

const authenticateMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'El usuario no está logueado' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.decoded = decoded;
        next();
    });

};

export default authenticateMiddleware;