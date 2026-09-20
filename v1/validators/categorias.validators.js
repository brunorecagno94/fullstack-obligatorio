import Joi from 'joi';

export const crearCategoriaSchema = Joi.object({
  nombreCategoria: Joi.string().trim().max(30).required().messages({
    'any.required': 'El nombre de la categoría es obligatorio',
    'string.base': 'El nombre de la categoría debe ser una cadena de texto',
    'string.empty': 'El nombre de la categoría no puede estar vacío',
    'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres',
  })
});

export const obtenerCategoriaPorIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'El id debe ser un ObjectId válido',
    'string.length': 'El id debe tener 24 caracteres',
    'any.required': 'El id es obligatorio',
  })
});

export const editarCategoriaSchema = crearCategoriaSchema;
export const eliminarCategoriaSchema = obtenerCategoriaPorIdSchema;
