import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  nombreJuego: {
    type: String,
    required: true,
    unique: true,
  },
  descripcionJuego: {
    type: String,
    required: true,
  },
  precioJuego: {
    type: Number,
    required: true,
  },
  edadMinima: {
    type: Number,
    required: true,
  },
  categorias: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  }],
  active: {
    type: Boolean,
    default: true
  }
});

const Juego = mongoose.model("Juego", juegoSchema, "juegos");

export default Juego;