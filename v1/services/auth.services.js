import Usuario from "../models/usuario.model.js";
import bcrypt from 'bcryptjs';
import throwError from "../utils/throwError.utils.js";
import generarToken from "../utils/generarToken.utils.js";

export const loginService = async (nombreUsuario, password) => {
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) throwError("Datos incorrectos", 401);

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) throwError("Datos incorrectos", 401);

    const token = generarToken(usuario);
    return { usuario, token };
};

export const registroService = async (usuarioData) => {
    const usuarioRepetido = await Usuario.findOne({
        $or: [{ email: usuarioData.email }, { nombreUsuario: usuarioData.nombreUsuario }]
    });
    if (usuarioRepetido) {
        const campo = usuarioRepetido.nombreUsuario === usuarioData.nombreUsuario ? "nombre de usuario" : "email";
        throwError(`Ya existe una cuenta con ese ${campo}`, 409);
    }

    const hashedPassword = await bcrypt.hash(usuarioData.password, Number(process.env.ROUND));
    const usuario = new Usuario({ ...usuarioData, password: hashedPassword, planUsuario: "plus" });
    const token = generarToken(usuario);
    await usuario.save();
    return { usuario, token };
};