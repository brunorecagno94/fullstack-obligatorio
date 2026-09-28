import express from 'express';
import { obtenerJuegoPorIdSchema, eliminarJuegoSchema, crearJuegoSchema, editarJuegoSchema, obtenerJuegosQuerySchema, obtenerPrecioConvertidoQuerySchema } from '../validators/juegos.validators.js';
import { crearJuego, obtenerJuegos, obtenerJuegoPorId, actualizarJuego, eliminarJuego, obtenerDescripcionIA, obtenerPrecioConvertido } from '../controllers/juegos.controller.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarParamsMiddleware from '../middlewares/validatedParams.middleware.js';
import validarQueryMiddleware from '../middlewares/validatedQuery.middleware.js';

const router = express.Router();

router.get('/', validarQueryMiddleware(obtenerJuegosQuerySchema), obtenerJuegos);
router.get('/:id', validarParamsMiddleware(obtenerJuegoPorIdSchema), obtenerJuegoPorId);
router.get('/:id/descripcion-ia', authorizationMiddleware('usuario'), validarParamsMiddleware(obtenerJuegoPorIdSchema), obtenerDescripcionIA);
router.get('/:id/convertir-precio', validarParamsMiddleware(obtenerJuegoPorIdSchema), validarQueryMiddleware(obtenerPrecioConvertidoQuerySchema), obtenerPrecioConvertido);
router.post('/', authorizationMiddleware('admin'), validarBodyMiddleware(crearJuegoSchema), crearJuego);
router.patch('/:id', authorizationMiddleware('admin'), validarParamsMiddleware(obtenerJuegoPorIdSchema), validarBodyMiddleware(editarJuegoSchema), actualizarJuego);
router.delete('/:id', authorizationMiddleware('admin'), validarParamsMiddleware(eliminarJuegoSchema), eliminarJuego);

export default router;