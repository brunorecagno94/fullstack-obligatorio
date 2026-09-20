import express from 'express';
import { obtenerJuegoPorIdSchema, obtenerJuegoPorNombreSchema, eliminarJuegoSchema, crearJuegoSchema } from '../validators/juegos.validators.js';
import { crearJuego, obtenerJuegos, obtenerJuegoPorId, obtenerJuegoPorNombre, eliminarJuego } from '../controllers/juegos.controller.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarPramsMiddleware from '../middlewares/validatedParams.middleware.js';

const router = express.Router();

router.get('/', obtenerJuegos);
router.post('/', authorizationMiddleware('admin'), validarBodyMiddleware(crearJuegoSchema), crearJuego);
router.get('/nombre', validarPramsMiddleware(obtenerJuegoPorNombreSchema), obtenerJuegoPorNombre);
router.get('/:id', authorizationMiddleware('admin'), validarPramsMiddleware(obtenerJuegoPorIdSchema), obtenerJuegoPorId);
router.delete('/:id', authorizationMiddleware('admin'), validarPramsMiddleware(eliminarJuegoSchema), eliminarJuego);
export default router;