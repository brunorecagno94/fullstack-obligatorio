import express from 'express';
import { obtenerUsuarioPorIdSchema, crearUsuarioSchema } from '../validators/usuarios.validators.js';
import { obtenerUsuarios, crearUsuario, obtenerUsuarioPorId } from '../controllers/usuarios.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';
import validarPramsMiddleware from '../middlewares/validatedParams.middleware.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.get('/:id', validarPramsMiddleware(obtenerUsuarioPorIdSchema), obtenerUsuarioPorId);
router.post('/', validarBodyMiddleware(crearUsuarioSchema), crearUsuario);

export default router;