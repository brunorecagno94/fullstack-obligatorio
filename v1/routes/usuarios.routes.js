import express from 'express';
import { crearUsuarioSchema } from '../validators/usuarios.validators.js';
import { obtenerUsuarios, crearUsuario, obtenerUsuarioPorId } from '../controllers/usuarios.controller.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';

const router = express.Router();

router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', validarBodyMiddleware(crearUsuarioSchema), crearUsuario);

export default router;