import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import juegosRoutes from './routes/juegos.routes.js';
const router = express.Router();

router.use('/usuarios', usuariosRoutes);
router.use('/categorias', categoriasRoutes);
router.use('/juegos', juegosRoutes);
export default router;