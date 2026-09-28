import express from 'express';
import { obtenerCategoriaPorIdSchema, crearCategoriaSchema, editarCategoriaSchema, eliminarCategoriaSchema } from '../validators/categorias.validators.js';
import { obtenerCategorias, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, editarCategoria } from '../controllers/categorias.controller.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarParamsMiddleware from '../middlewares/validatedParams.middleware.js';

const router = express.Router();

router.get('/', obtenerCategorias);
router.post('/', authorizationMiddleware('admin'), validarBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.get('/:id', authorizationMiddleware('admin'), validarParamsMiddleware(obtenerCategoriaPorIdSchema), obtenerCategoriaPorId);
router.delete('/:id', authorizationMiddleware('admin'), validarParamsMiddleware(eliminarCategoriaSchema), eliminarCategoria);
router.patch('/:id', authorizationMiddleware('admin'), validarParamsMiddleware(obtenerCategoriaPorIdSchema), validarBodyMiddleware(editarCategoriaSchema), editarCategoria);
export default router;