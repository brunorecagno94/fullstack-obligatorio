import Joi from 'joi';

export const crearCategoriaSchema = Joi.object({
  nombreCategoria: Joi.string().max(30).required().messages({
    'string.base': 'El nombre de la categoría debe ser una cadena de texto',
    'string.empty': 'El nombre de la categoría no puede estar vacío',
    'string.max': 'El nombre de la categoría no puede tener más de {#limit} caracteres',
  }),
});

export const obtenerCategoriaPorIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID de la categoría debe ser un número',
    'number.integer': 'El ID de la categoría debe ser un número entero',
    'number.positive': 'El ID de la categoría debe ser un número positivo',
    'any.required': 'El ID de la categoría es obligatorio',
  })
});

export const eliminarCategoriaSchema = obtenerCategoriaPorIdSchema;
