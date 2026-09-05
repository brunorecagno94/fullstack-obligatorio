let juegos = [{
    id: 1,
    nombreJuego: 'Dark Souls',
    descripcionJuego: 'Un juego de rol de acción desafiante y oscuro.',
    edadMinima: 16,
    categoriaId: [1, 2, 3]
},
{
    id: 2,
    nombreJuego: 'Valorant',
    descripcionJuego: 'Un juego de disparos táctico en primera persona.',
    edadMinima: 13,
    categoriaId: [1, 8, 11]
},
{
    id: 3,
    nombreJuego: 'The Legend of Zelda: Breath of the Wild',
    descripcionJuego: 'Un juego de rol de acción en el que te aventuras por el reino de Hyrule.',
    edadMinima: 13,
    categoriaId: [2, 3, 10]
},
{
    id: 4,
    nombreJuego: 'Armored Core VI: Fires of Rubicon',
    descripcionJuego: 'Un juego de acción y mechas en el que pilotas un robot gigante.',
    edadMinima: 16,
    categoriaId: [1, 2, 3, 8]
},
{
    id: 5,
    nombreJuego: 'Hollow Knight',
    descripcionJuego: 'Un juego de acción y aventuras en un mundo subterráneo lleno de insectos y criaturas.',
    edadMinima: 15,
    categoriaId: [2, 3, 9]
},
{
    id: 6,
    nombreJuego: 'FIFA 23',
    descripcionJuego: 'Un juego de simulación de fútbol con gráficos realistas y modos de juego variados.',
    edadMinima: 10,
    categoriaId: [6]
},
{
    id: 7,
    nombreJuego: 'Disco Elysium',
    descripcionJuego: 'Un juego de rol en el que interpretas a un detective con problemas de memoria y adicciones.',
    edadMinima: 18,
    categoriaId: [2, 3, 9]
},
{
    id: 8,
    nombreJuego: 'Baldur\'s Gate 3',
    descripcionJuego: 'Un juego de rol basado en el universo de Dungeons & Dragons.',
    edadMinima: 16,
    categoriaId: [2, 3, 9]
},
{
    id: 9,
    nombreJuego: 'Terraria',
    descripcionJuego: 'Un juego de aventuras y construcción en un mundo 2D generado aleatoriamente.',
    edadMinima: 10,
    categoriaId: [2, 3, 8, 9, 10]
},
{
    id: 10,
    nombreJuego: 'Stardew Valley',
    descripcionJuego: 'Un juego de simulación de granja y vida rural.',
    edadMinima: 10,
    categoriaId: [2, 3, 7, 9]
},
{
    id: 11,
    nombreJuego: 'Call of Duty: Modern Warfare II',
    descripcionJuego: 'Un juego de disparos en primera persona con una campaña intensa y multijugador competitivo.',
    edadMinima: 18,
    categoriaId: [1, 8, 11]
}];

export const obtenerJuegos = (req, res) => {
    if (!juegos || juegos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron juegos' });
    }
    res.status(200).json(juegos);
}

export const obtenerJuegoPorID = (req, res) => {
    const { id } = req.params;
    const juego = juegos.find(j => j.id === parseInt(id));
    if (!juego) {
        return res.status(404).json({ message: 'No se encontró el juego' });
    }
    res.status(200).json(juego);
}

export const crearJuego = (req, res) => {
    const nuevoJuego = req.validatedBody;
    let idJuego = juegos.length + 1;
    nuevoJuego.id = idJuego;
    juegos.push(nuevoJuego);
    res.status(201).json({ message: `Se creó un nuevo juego: ${nuevoJuego.nombreJuego}` });
}

export const eliminarJuego = (req, res) => {
    const { id } = req.params;
    const juegoIndex = juegos.findIndex(j => j.id === parseInt(id));
    if (juegoIndex === -1) {
        return res.status(404).json({ message: 'No se encontró el juego' });
    }
    juegos.splice(juegoIndex, 1);
    res.status(200).json({ message: 'Juego eliminado correctamente' });
}