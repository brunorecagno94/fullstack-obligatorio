let categoriasJuegos = [
    { id: 1, nombreCategoria: 'Acción' },
    { id: 2, nombreCategoria: 'Aventura' },
    { id: 3, nombreCategoria: 'RPG' },
    { id: 4, nombreCategoria: 'Estrategia' },
    { id: 5, nombreCategoria: 'Terror' },
    { id: 6, nombreCategoria: 'Deportes' },
    { id: 7, nombreCategoria: 'Cozy' },
    { id: 8, nombreCategoria: 'Multijugador' },
    { id: 9, nombreCategoria: 'Indie' },
    { id: 10, nombreCategoria: 'Puzzle' },
    { id: 11, nombreCategoria: 'First Person Shooter' }
];

export const obtenerCategorias = (req, res) => {
    if (!categoriasJuegos || categoriasJuegos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron categorías de juegos' });
    }
    res.status(200).json(categoriasJuegos);
}

export const obtenerCategoriaPorId = (req, res) => {
    const id = req.validatedParams.id;
    const categoria = categoriasJuegos.find(c => c.id === parseInt(id));
    if (!categoria) {
        return res.status(404).json({ message: 'No se encontró la categoría' });
    }
    res.status(200).json(categoria);
}

export const crearCategoria = (req, res) => {
    const nuevaCategoria = req.validatedBody;
    let idCategoria = categoriasJuegos.length + 1;
    nuevaCategoria.id = idCategoria;
    categoriasJuegos.push(nuevaCategoria);
    res.status(201).json({ message: `Se creó una nueva categoría: ${nuevaCategoria.nombreCategoria}` });
}

export const eliminarCategoria = (req, res) => {
    const id = req.validatedParams.id;
    const categoriaIndex = categoriasJuegos.findIndex(c => c.id === parseInt(id));
    if (categoriaIndex === -1) {
        return res.status(404).json({ message: 'No se encontró la categoría' });
    }
    categoriasJuegos.splice(categoriaIndex, 1);
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
}