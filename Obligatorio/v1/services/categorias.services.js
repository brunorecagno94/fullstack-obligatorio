import Categoria from "../models/categoria.model.js";
import Juego from "../models/juego.model.js";
import throwError from "../utils/throwError.utils.js";

export const obtenerCategoriasService = async () => {
    const categorias = await Categoria.find({ active: true });
    return categorias;
}

export const obtenerCategoriaPorIdService = async (id) => {
    const categoria = await Categoria.findOne({ _id: id, active: true });
    if (!categoria) throwError("No se encontró la categoría", 404);
    return categoria;
}

export const crearCategoriaService = async (categoriaData) => {
    const categoriaRepetida = await Categoria.findOne({ nombreCategoria: categoriaData.nombreCategoria });
    if (categoriaRepetida) {
        if (categoriaRepetida.active === true) throwError("Ya existe la categoría", 409);
        categoriaRepetida.active = true;
        await categoriaRepetida.save();
        return categoriaRepetida;
    }

    const categoria = new Categoria(categoriaData);
    await categoria.save();
    return categoria;
}

export const eliminarCategoriaService = async (id) => {
    const categoria = await Categoria.findOne({ _id: id, active: true });
    if (!categoria) throwError("No se encontró la categoría", 404, { id });

    const categoriaUsada = await Juego.exists({ categorias: id, active: true });
    if (categoriaUsada) throwError("No se puede eliminar la categoría si tiene juegos asociados", 409);

    categoria.active = false;
    await categoria.save();
    return categoria;
};

export const editarCategoriaService = async (id, categoriaData) => {
    const categoria = await Categoria.findOne({ _id: id, active: true });
    if (!categoria) throwError("No se encontró la categoría", 404, { id });

    const categoriaRepetida = await Categoria.findOne({ nombreCategoria: categoriaData.nombreCategoria, _id: { $ne: id } });
    if (categoriaRepetida) throwError("Ya existe una categoría con ese nombre", 409, { nombreCategoria: categoriaData.nombreCategoria });

    categoria.nombreCategoria = categoriaData.nombreCategoria;
    await categoria.save();
    return categoria;
}