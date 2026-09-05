import Joi from 'joi';

export const crearJuegoSchema = Joi.object({
  nombreJuego: Joi.string().trim().max(50).required().messages({
    'string.base': 'El nombre del juego debe ser una cadena de texto',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.max': 'El nombre del juego no puede superar los {#limit} caracteres',
  }),
  descripcionJuego: Joi.string().trim().max(200).required().messages({
    'string.base': 'La descripción del juego debe ser una cadena de texto',
    'string.empty': 'La descripción del juego no puede estar vacía',
    'string.max': 'La descripción del juego no puede superar los {#limit} caracteres',
  }),
  edadMinima: Joi.number().integer().min(0).max(18).required().messages({
    'number.base': 'La edad mínima debe ser un número',
    'number.integer': 'La edad mínima debe ser un número entero',
    'number.min': 'La edad mínima no puede ser un número negativo',
    'number.max': 'La edad mínima no puede ser mayor a 18',
  }),
  categoriaId: Joi.array().items(Joi.number().integer().min(1)).min(1).required().messages({
    'array.base': 'El valor debe ser un array',
    'number.base': 'Cada ID de categoría debe ser un número',
    'number.min': 'Cada ID de categoría debe ser un número entero',
    'any.required': 'El juego debe tener al menos una categoría',
  }),
});