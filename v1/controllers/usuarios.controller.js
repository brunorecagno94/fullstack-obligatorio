let usuarios = [{
  id: 1,
  nombreUsuario: 'admin1',
  password: 'AdminUser-1',
  rol: 'admin'
}];

export const obtenerUsuarios = (req, res) => {
  res.status(200).json(usuarios);
}

export const obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const usuario = usuarios.find(u => u.id === parseInt(id));
  if (!usuario) {
    return res.status(404).json({ message: `No se encontró el usuario` });
  }
  res.status(200).json(usuario.nombreUsuario);
  // ToDo: Seguramente ésto cambie en un futuro
}

export const crearUsuario = (req, res) => {
  const nuevoUsuario = req.validatedBody;
  let idUsuario = usuarios.length + 1;
  nuevoUsuario.id = idUsuario, nuevoUsuario.planUsuario = "plus", nuevoUsuario.rolUsuario = "usuario";
  usuarios.push(nuevoUsuario);
  res.status(201).json({ message: `Se creó un nuevo usuario: ${nuevoUsuario.nombreUsuario}` });
}