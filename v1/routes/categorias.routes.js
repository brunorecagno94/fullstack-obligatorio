import express from 'express';
import { obtenerCategoriaPorIdSchema, crearCategoriaSchema, eliminarCategoriaSchema } from '../validators/categorias.validators.js';
import { obtenerCategorias, crearCategoria, eliminarCategoria, obtenerCategoriaPorId } from '../controllers/categorias.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarParamsMiddleware from '../middlewares/validatedParams.middleware.js';
const router = express.Router();

router.get('/', obtenerCategorias);
router.get('/:id', validarParamsMiddleware(obtenerCategoriaPorIdSchema), obtenerCategoriaPorId);
router.post('/', validarBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.delete('/:id', validarParamsMiddleware(eliminarCategoriaSchema), eliminarCategoria);
export default router;