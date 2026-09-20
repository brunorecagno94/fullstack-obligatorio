import express from 'express';
import { upgradePlanUsuario } from '../controllers/usuarios.controller.js';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.patch('/upgrade', authorizationMiddleware('usuario'), upgradePlanUsuario)

export default router;