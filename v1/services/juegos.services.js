import Juego from "../models/juego.model.js";
import throwError from "../utils/throwError.utils.js";

export const crearJuegoService = async (juegoData) => {
    const juegoBuscado = await Juego.findOne({ nombreJuego: juegoData.nombreJuego });
    if (juegoBuscado) throwError("El juego ya existe", 409, { nombreJuego: juegoData.nombreJuego });
    const juego = new Juego(juegoData);
    await juego.save();
    return juego;
}

export const obtenerJuegosService = async () => {
    const juegos = await Juego.find();
    if (!juegos || juegos.length === 0) throwError("No se encontraron juegos", 404);
    return juegos;
};

export const obtenerJuegoPorIdService = async (id) => {
    const juego = await Juego.findById(id);
    if (!juego) throwError("No se encontró el juego", 404, { id });
    return juego;
}

export const obtenerJuegoPorNombreService = async (nombre) => {
    const juegoEncontrado = await Juego.findOne({ nombreJuego: nombre });
    if (!juegoEncontrado) throwError("No se encontró el juego", 404, { nombre });
    return juegoEncontrado;
}

export const actualizarJuegoService = async (id, juego) => {
    const juegoActualizado = await Juego.findByIdAndUpdate(id, juego, { returnDocument: "after" });
    if (!juegoActualizado) throwError("No se encontró el juego", 404, { id });
    return juegoActualizado;
}

export const eliminarJuegoService = async (id) => {
    const juego = await Juego.findByIdAndDelete(id);
    if (!juego) throwError("No se encontró el juego", 404, { id });
    return juego;
}

export const obtenerJuegosPorRangoPrecioService = async (min, max) => {
    const juegos = await Juego.find({ precioJuego: { $gte: min, $lte: max } });
    if (!juegos || juegos.length === 0) throwError("No se encontraron juegos en el rango de precio especificado", 404, { min, max });
    return juegos;
}

export const obtenerJuegosPorRangoEdadService = async (min, max) => {
    const juegos = await Juego.find({ edadMinima: { $gte: min, $lte: max } });
    if (!juegos || juegos.length === 0) throwError("No se encontraron juegos para el rango de edad especificado", 404, { min, max });
    return juegos;
}