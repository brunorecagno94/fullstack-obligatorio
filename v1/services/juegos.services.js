import Juego from "../models/juego.model.js";
import Categoria from "../models/categoria.model.js";
import throwError from "../utils/throwError.utils.js";
import obtenerConsultaGroqService from "../services/groq.service.js";

export const crearJuegoService = async (juegoData) => {
  const categoriasValidas = await Categoria.find({ _id: { $in: juegoData.categorias }, active: true });
  if (categoriasValidas.length !== juegoData.categorias.length) {
    throwError("Una o más categorías no existen", 400, { categorias: juegoData.categorias });
  }

  const juegoExistente = await Juego.findOne({ nombreJuego: juegoData.nombreJuego });
  if (juegoExistente) {
    if (juegoExistente.active) throwError("El juego ya existe", 409);
    Object.assign(juegoExistente, juegoData, { active: true });
    await juegoExistente.save();
    return juegoExistente;
  }

  const juegoNuevo = new Juego(juegoData);
  await juegoNuevo.save();
  return juegoNuevo;
}

export const obtenerJuegosService = async ({ nombre, categoria, precioMin, precioMax, limit, page } = {}) => {
  const filtro = { active: true };
  if (nombre) filtro.nombreJuego = { $regex: nombre, $options: "i" };
  if (categoria) filtro.categorias = categoria;
  if (precioMin || precioMax) {
    filtro.precioJuego = {};
    if (precioMin) filtro.precioJuego.$gte = Number(precioMin);
    if (precioMax) filtro.precioJuego.$lte = Number(precioMax);
  }

  limit = Number(limit) || 10;
  page = Number(page) || 1;
  const skip = (page - 1) * limit;

  const [juegos, total] = await Promise.all([
    Juego.find(filtro).populate("categorias", "nombreCategoria").skip(skip).limit(limit),
    Juego.countDocuments(filtro)
  ]);

  const totalPages = Math.ceil(total / limit);
  return { juegos, total, page, limit, totalPages };
};

export const obtenerJuegoPorIdService = async (id) => {
  const juego = await Juego.findOne({ _id: id, active: true }).populate("categorias", "nombreCategoria");
  if (!juego) throwError("No se encontró el juego", 404);
  return juego;
}

export const actualizarJuegoService = async (id, juegoData) => {
  const juego = await Juego.findOne({ _id: id, active: true });
  if (!juego) throwError("No se encontró el juego", 404);

  if (juegoData.nombreJuego) {
    const repetido = await Juego.findOne({ nombreJuego: juegoData.nombreJuego, _id: { $ne: id } });
    if (repetido) throwError("Ya existe un juego con ese nombre", 409);
  }

  if (juegoData.categorias) {
    const categoriasValidas = await Categoria.find({ _id: { $in: juegoData.categorias }, active: true });
    if (categoriasValidas.length !== juegoData.categorias.length) {
      throwError("Una o más categorías no existen", 400, { categorias: juegoData.categorias });
    }
  }

  Object.assign(juego, juegoData);
  await juego.save();
  return juego;
}

export const eliminarJuegoService = async (id) => {
  const juego = await Juego.findOne({ _id: id, active: true });
  if (!juego) throwError("No se encontró el juego", 404);
  juego.active = false;
  await juego.save();
  return juego;
}

export const obtenerDescripcionIAService = async (id) => {
  const juego = await obtenerJuegoPorIdService(id);

  try {
    const prompt = `¿Podrías contarme más sobre el juego "${juego.nombreJuego}"?.`;
    const chatCompletion = await obtenerConsultaGroqService(prompt);
    const descripcionIA = chatCompletion?.choices?.[0]?.message?.content;

    if (!descripcionIA) throwError("Respuesta vacía de Groq", 404);

    return { descripcion: descripcionIA, generadoPorIA: true };
  } catch (error) {
    console.error("Error consultando a Groq:", error)
    return { descripcion: juego.descripcionJuego, generadoPorIA: false };
  }
};

export const obtenerPrecioConvertidoService = async (id, monedaDestino) => {
  const juego = await obtenerJuegoPorIdService(id);
  const monedaOrigen = juego.monedaJuego;

  if (monedaOrigen === monedaDestino) throwError("La moneda destino no puede ser la misma que la actual", 400);

  const response = await fetch(`https://api.frankfurter.dev/v2/rate/${monedaOrigen.toLowerCase()}/${monedaDestino.toLowerCase()}`);
  if (!response.ok) throwError("No se pudo obtener la cotización de la moneda", 502);

  const data = await response.json();

  return {
    nombreJuego: juego.nombreJuego,
    precioOriginal: juego.precioJuego,
    monedaOriginal: monedaOrigen,
    monedaDestino: monedaDestino.toUpperCase(),
    tasaCambio: data.rate,
    precioConvertido: Number((juego.precioJuego * data.rate).toFixed(2)),
  };
};