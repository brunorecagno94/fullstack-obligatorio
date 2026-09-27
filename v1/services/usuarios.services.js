import Usuario from "../models/usuario.model.js";
import Juego from "../models/juego.model.js";
import calcularEdad from "../utils/calcularEdad.utils.js"
import throwError from "../utils/throwError.utils.js";

export const upgradePlanUsuarioService = async (id) => {
  const usuario = await Usuario.findById(id);

  if (!usuario || usuario.active === false) throwError("No se encontró el usuario", 404);
  if (usuario.rol !== "usuario") throwError("Solo los usuarios pueden cambiar de plan", 403);
  if (usuario.planUsuario === "premium") throwError("El usuario ya tiene el plan Premium", 400);

  usuario.planUsuario = "premium";
  await usuario.save();
  return usuario;
}

export const comprarJuegoService = async (idUsuario, idJuego) => {
  const usuario = await Usuario.findById(idUsuario);
  const juego = await Juego.findById(idJuego);
  
  if (!usuario || usuario.active === false) throwError("No se encontró el usuario", 404);
  if (!juego || juego.active === false) throwError("No se encontró el juego", 404);
  if (usuario.rol !== "usuario") throwError("Solo los usuarios pueden comprar juegos", 403);
  
  const edadUsuario = calcularEdad(usuario.fechaNacimiento);
  if (edadUsuario < juego.edadMinima) throwError("No tienes edad suficiente para comprar este juego", 403);

  const juegoComprado = usuario.juegosComprados.some((id) => id.equals(juego._id));
  if (juegoComprado) throwError("Ya tenés este juego en tu biblioteca", 409);
  if (usuario.planUsuario === "plus" && usuario.juegosComprados.length >= 4) throwError("No se puede superar el límite de compras (4)", 400);
  
  usuario.juegosComprados.push(juego._id);
  await usuario.save();
  return juego;
}

export const verJuegosCompradosService = async (idUsuario) => {
  const usuario = await Usuario.findById(idUsuario).populate("juegosComprados", "nombreJuego descripcionJuego" );

  if (!usuario || usuario.active === false) throwError("No se encontró el usuario", 404);
  return usuario.juegosComprados;
}