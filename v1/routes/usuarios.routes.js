import express from 'express';
import {comprarJuegoSchema} from "../validators/usuarios.validators.js"
import { upgradePlanUsuario, comprarJuego, verJuegosComprados } from '../controllers/usuarios.controller.js';
import validarParamsMiddleware from "../middlewares/validatedParams.middleware.js"
import authorizationMiddleware from '../middlewares/authorization.middleware.js';

const router = express.Router();

router.get('/compras', authorizationMiddleware('usuario'), verJuegosComprados);
router.patch('/compras/:id', authorizationMiddleware('usuario'), validarParamsMiddleware(comprarJuegoSchema), comprarJuego);
router.patch('/upgrade', authorizationMiddleware('usuario'), upgradePlanUsuario);

export default router;