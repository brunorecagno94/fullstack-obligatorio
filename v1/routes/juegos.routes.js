import express from 'express';
import { obtenerJuegoPorIdSchema, eliminarJuegoSchema, crearJuegoSchema } from '../validators/juegos.validators.js';
import { obtenerJuegos, crearJuego, eliminarJuego, obtenerJuegoPorID } from '../controllers/juegos.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarPramsMiddleware from '../middlewares/validatedParams.middleware.js';

const router = express.Router();

router.get('/', obtenerJuegos);
router.get('/:id', validarPramsMiddleware(obtenerJuegoPorIdSchema), obtenerJuegoPorID);
router.post('/', validarBodyMiddleware(crearJuegoSchema), crearJuego);
router.delete('/:id', validarPramsMiddleware(eliminarJuegoSchema), eliminarJuego);
export default router;