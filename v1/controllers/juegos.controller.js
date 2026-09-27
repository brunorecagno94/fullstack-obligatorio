import {
    crearJuegoService,
    obtenerJuegosService,
    obtenerJuegoPorIdService,
    actualizarJuegoService,
    eliminarJuegoService
} from "../services/juegos.services.js";

export const crearJuego = async (req, res) => {
    const nuevoJuego = await crearJuegoService(req.validatedBody);
    res.status(201).json({ message: `Juego creado con éxito: ${nuevoJuego.nombreJuego}`, juego: nuevoJuego });
}

export const obtenerJuegos = async (req, res) => {
    const juegos = await obtenerJuegosService(req.validatedQuery);
    res.status(200).json(juegos);
}

export const obtenerJuegoPorId = async (req, res) => {
    const juego = await obtenerJuegoPorIdService(req.validatedParams.id);
    res.status(200).json(juego);
}

export const actualizarJuego = async (req, res) => {
    const juego = await actualizarJuegoService(req.validatedParams.id, req.validatedBody);
    res.status(200).json({ message: "Juego actualizado correctamente", juego });
}

export const eliminarJuego = async (req, res) => {
    const juego = await eliminarJuegoService(req.validatedParams.id);
    res.status(200).json({ message: `Juego eliminado correctamente: ${juego.nombreJuego}` });
}