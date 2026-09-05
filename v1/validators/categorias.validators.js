import Joi from 'joi';

export const crearCategoriaSchema = Joi.object({
  nombreCategoria: Joi.string().max(30).required().messages({
    'string.base': 'El nombre de la categoría debe ser una cadena de texto',
    'string.empty': 'El nombre de la categoría no puede estar vacío',
    'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres',
  }),
});