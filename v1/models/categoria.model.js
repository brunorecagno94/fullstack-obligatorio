import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombreCategoria: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Categoria = mongoose.model("Categoria", categoriaSchema, "categorias");

export default Categoria;