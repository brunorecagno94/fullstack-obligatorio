import {
  upgradePlanUsuarioService,
  comprarJuegoService,
  verJuegosCompradosService,
} from "../services/usuarios.services.js";
 

export const upgradePlanUsuario = async (req, res) => {
  await upgradePlanUsuarioService(req.decoded.id);
  res.status(200).json({ message: `Felicidades! Actualizaste tu plan a Premium.` });
}

export const comprarJuego = async (req, res) => {
  const juego = await comprarJuegoService(req.decoded.id,req.validatedParams.id);
  res.status(200).json({ message: `Juego comprado con éxito: ${juego.nombreJuego}`});
}

export const verJuegosComprados = async (req, res) => {
  const juegosComprados = await verJuegosCompradosService(req.decoded.id);
  res.status(200).json({juegosComprados});
}