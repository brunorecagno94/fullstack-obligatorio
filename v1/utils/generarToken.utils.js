import jwt from 'jsonwebtoken';

const generarToken = (usuario) =>
  jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.SECRET_KEY, { expiresIn: '1h' });

export default generarToken;