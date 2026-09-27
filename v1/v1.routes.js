import express from 'express';
import usuariosRouter from './routes/usuarios.routes.js';
import authRouter from './routes/auth.routes.js';
import categoriasRouter from './routes/categorias.routes.js';
import juegosRouter from './routes/juegos.routes.js';
import uploadsRouter from './routes/uploads.routes.js';
import authenticateMiddleware from './middlewares/authenticate.middleware.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use(authenticateMiddleware);
router.use('/usuarios', usuariosRouter);
router.use('/categorias', categoriasRouter);
router.use('/juegos', juegosRouter);
router.use("/uploads", uploadsRouter);

export default router;