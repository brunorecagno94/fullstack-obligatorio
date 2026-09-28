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
  monedaJuego: {
    type: String,
    required: true,
    default: "USD",
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
  imagenJuego: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Juego = mongoose.model("Juego", juegoSchema, "juegos");

export default Juego;