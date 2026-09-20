import {
  upgradePlanUsuarioService
} from "../services/usuarios.services.js";
 

export const upgradePlanUsuario = async (req, res) => {
  await upgradePlanUsuarioService(req.decoded.id);
  res.status(200).json({ message: `Felicidades! Actualizaste tu plan a Premium.` });
}