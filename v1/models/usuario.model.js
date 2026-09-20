import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
	nombreUsuario: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fechaNacimiento: {
		type: Date,
		required: true
	},
	nombre: {
		type: String
	},
	apellido: {
		type: String
	},
	pais: {
		type: String
	},
	rol: {
		type: String,
		enum: ["admin", "usuario"],
		default: "usuario"
	},
	planUsuario: {
		type: String,
		enum: ["plus", "premium"]
	},
	active: {
		type: Boolean,
		default: true
	}
});

const Usuario = mongoose.model("Usuario", usuarioSchema, "usuarios");

export default Usuario;