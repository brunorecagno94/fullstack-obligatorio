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
  precioJuego: Joi.number().positive().required().messages({
    'number.base': 'El precio del juego debe ser un número',
    'number.positive': 'El precio del juego debe ser un número positivo',
  }),
  edadMinima: Joi.number().integer().positive().max(18).required().messages({
    'number.base': 'La edad mínima debe ser un número',
    'number.integer': 'La edad mínima debe ser un número entero',
    'number.positive': 'La edad mínima debe ser un número positivo',
    'number.max': 'La edad mínima no puede ser mayor a 18',
  }),
  categorias: Joi.array().items(Joi.string().trim().max(50).required().messages({
    'string.base': 'Cada categoría debe ser una cadena de texto',
    'string.empty': 'Cada categoría no puede estar vacía',
  })).min(1).required().messages({
    'array.min': 'Cada juego debe tener al menos una categoría',
  })
});

export const obtenerJuegoPorIdSchema = Joi.string().hex().length(24).required().messages({
  'string.hex': 'El id debe ser un ObjectId válido',
  'string.length': 'El id debe tener 24 caracteres',
  'any.required': 'El id es obligatorio',
});

export const eliminarJuegoSchema = obtenerJuegoPorIdSchema;

export const obtenerJuegoPorNombreSchema = Joi.object({
  nombreJuego: Joi.string().trim().max(50).required().messages({
    'string.base': 'El nombre del juego debe ser una cadena de texto',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.max': 'El nombre del juego no puede superar los {#limit} caracteres',
  })
});
