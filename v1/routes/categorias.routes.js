import express from 'express';
import { crearCategoriaSchema } from '../validators/categorias.validators.js';
import { obtenerCategorias, crearCategoria, eliminarCategoria, obtenerCategoriaPorID } from '../controllers/categorias.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';

const router = express.Router();

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorID);
router.post('/', validarBodyMiddleware(crearCategoriaSchema), crearCategoria);
router.delete('/:id', eliminarCategoria);
export default router;