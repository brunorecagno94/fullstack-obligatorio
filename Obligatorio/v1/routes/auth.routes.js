import express from 'express';
import { loginUsuario, registroUsuario } from '../controllers/auth.controller.js';
import { loginSchema, registroSchema } from '../validators/auth.validators.js';
import validarBodyMiddleware from '../middlewares/validatedBody.middleware.js';

const router = express.Router({ mergeParams: true });

router.post('/login', validarBodyMiddleware(loginSchema), loginUsuario);
router.post('/registro', validarBodyMiddleware(registroSchema), registroUsuario);

export default router;