import { obtenerCategoriasService, obtenerCategoriaPorIdService, crearCategoriaService, editarCategoriaService, eliminarCategoriaService } from "../services/categorias.services.js";

export const obtenerCategorias = async (req, res) => {
    res.status(200).json(await obtenerCategoriasService());
}

export const obtenerCategoriaPorId = async (req, res) => {
    const categoria = await obtenerCategoriaPorIdService(req.validatedParams.id);
    res.status(200).json(categoria);
}

export const crearCategoria = async (req, res) => {
    const nuevaCategoria = await crearCategoriaService(req.validatedBody);
    res.status(201).json({ message: `Se creó una nueva categoría: ${nuevaCategoria.nombreCategoria}`, categoria: nuevaCategoria });
}

export const editarCategoria = async (req, res) => { 
    await editarCategoriaService(req.validatedParams.id, req.validatedBody);
    res.status(200).json({ message: "Se actualizó correctamente la categoría"})
}

export const eliminarCategoria = async (req, res) => {
    await eliminarCategoriaService(req.validatedParams.id);
    res.status(200).json({ message: 'Se eliminó correctamente la categoría' });
}