import {
    crearJuegoService,
    obtenerJuegosService,
    obtenerJuegoPorIdService,
    obtenerJuegoPorNombreService,
    actualizarJuegoService,
    eliminarJuegoService,
    obtenerJuegosPorRangoPrecioService,
    obtenerJuegosPorRangoEdadService
} from "../services/juegos.services.js";

export const crearJuego = async (req, res) => {
    const datosJuego = req.validatedBody;
    const nuevoJuego = await crearJuegoService(datosJuego);
    res.status(201).json({ message: `Juego creado con éxito: ${nuevoJuego.nombreJuego}` });
}

export const obtenerJuegos = async (req, res) => {
    const juegos = await obtenerJuegosService();
    res.status(200).json(juegos);
}

export const obtenerJuegoPorId = async (req, res) => {
    const id = req.validatedParams.id;
    const juegoEncontrado = await obtenerJuegoPorIdService(id);
    res.status(200).json(juegoEncontrado);
}

export const obtenerJuegoPorNombre = async (req, res) => {
    const nombre = req.validatedParams.nombreJuego;
    const juegoEncontrado = await obtenerJuegoPorNombreService(nombre);
    res.status(200).json(juegoEncontrado);
}

export const actualizarJuego = async (req, res) => {
    const id = req.validatedParams.id;
    const datosJuego = req.validatedBody;
    const juego = await actualizarJuegoService(id, datosJuego);
    res.status(200).json(juego);
}

export const eliminarJuego = async (req, res) => {
    const id = req.validatedParams.id;
    const juegoEliminado = await eliminarJuegoService(id);
    res.status(200).json({ message: `Juego eliminado correctamente: ${juegoEliminado.nombreJuego}` });
}

export const obtenerJuegosPorRangoPrecio = async (req, res) => {
    const { min, max } = req.validatedQuery;
    const juegos = await obtenerJuegosPorRangoPrecioService(min, max);
    res.status(200).json(juegos);
}

export const obtenerJuegosPorRangoEdad = async (req, res) => {
    const { min, max } = req.validatedQuery;
    const juegos = await obtenerJuegosPorRangoEdadService(min, max);
    res.status(200).json(juegos);
}