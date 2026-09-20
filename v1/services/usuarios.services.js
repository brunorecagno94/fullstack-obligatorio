import Usuario from "../models/usuario.model.js";
import throwError from "../utils/throwError.utils.js";

export const upgradePlanUsuarioService = async (id) => {
    const usuario = await Usuario.findById(id);
    if (!usuario || usuario.active === false) throwError("No se encontró el usuario", 404);
    if (usuario.rol !== "usuario") throwError("Solo los usuarios pueden cambiar de plan", 403);
    if (usuario.planUsuario === "premium") throwError("El usuario ya tiene el plan Premium", 400);

    usuario.planUsuario = "premium";
    await usuario.save();
    return usuario;
}