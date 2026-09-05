import express from 'express';
import { crearJuegoSchema } from '../validators/juegos.validators.js';
import { obtenerJuegos, crearJuego, eliminarJuego, obtenerJuegoPorID } from '../controllers/juegos.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';

const router = express.Router();

router.get('/', obtenerJuegos);
router.get('/:id', obtenerJuegoPorID);
router.post('/', validarBodyMiddleware(crearJuegoSchema), crearJuego);
router.delete('/:id', eliminarJuego);
export default router;