import Joi from 'joi';

export const crearJuegoSchema = Joi.object({
  nombreJuego: Joi.string().trim().max(50).required().messages({
    'any.required': 'El nombre del juego es obligatorio',
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.max': 'El nombre del juego no puede superar los {#limit} caracteres',
  }),
  descripcionJuego: Joi.string().trim().max(200).required().messages({
    'any.required': 'La descripción del juego es obligatoria',
    'string.empty': 'La descripción del juego no puede estar vacía',
    'string.max': 'La descripción del juego no puede superar los {#limit} caracteres',
  }),
  precioJuego: Joi.number().positive().required().messages({
    'any.required': 'El precio del juego es obligatorio',
    'number.positive': 'El precio del juego debe ser un número positivo',
  }),
  monedaJuego: Joi.string().length(3).uppercase().required().messages({
    'string.length': 'La moneda debe ser un código de 3 letras (ej: UYU, USD, EUR)',
  }),
  edadMinima: Joi.number().integer().min(0).max(18).required().messages({
    'any.required': 'La edad mínima es obligatoria',
    'number.integer': 'La edad mínima debe ser un número entero',
    'number.max': 'La edad mínima no puede ser mayor a 18',
  }),
  categorias: Joi.array().items(
    Joi.string().hex().length(24).messages({
      'string.hex': 'Cada categoría debe ser un ObjectId válido',
      'string.length': 'Cada categoría debe tener 24 caracteres',
    })
  ).min(1).required().messages({
    'array.min': 'El juego debe tener al menos una categoría',
    'any.required': 'Las categorías son obligatorias',
  }),
  imagenJuego: Joi.string().uri().optional().messages({
    'string.uri': 'La imagen debe ser una URL válida',
  }),
});

export const editarJuegoSchema = Joi.object({
  nombreJuego: Joi.string().trim().max(50).messages({
    'string.empty': 'El nombre del juego no puede estar vacío',
    'string.max': 'El nombre del juego no puede superar los {#limit} caracteres',
  }),
  descripcionJuego: Joi.string().trim().max(200).messages({
    'string.empty': 'La descripción del juego no puede estar vacía',
    'string.max': 'La descripción del juego no puede superar los {#limit} caracteres',
  }),
  precioJuego: Joi.number().positive().messages({
    'number.positive': 'El precio del juego debe ser un número positivo',
  }),
  monedaJuego: Joi.string().length(3).uppercase().optional().messages({
    'string.length': 'La moneda debe ser un código de 3 letras (ej: UYU, USD, EUR)',
  }),
  edadMinima: Joi.number().integer().min(0).max(18).messages({
    'number.integer': 'La edad mínima debe ser un número entero',
    'number.max': 'La edad mínima no puede ser mayor a 18',
  }),
  categorias: Joi.array().items(
    Joi.string().hex().length(24).messages({
      'string.hex': 'Cada categoría debe ser un ObjectId válido',
      'string.length': 'Cada categoría debe tener 24 caracteres',
    })
  ).min(1).messages({
    'array.min': 'El juego debe tener al menos una categoría',
  }),
  imagenJuego: Joi.string().uri().optional().messages({
    'string.uri': 'La imagen debe ser una URL válida',
  }),
}).min(1).messages({
  'object.min': 'Se debe enviar al menos un campo para actualizar',
});

export const obtenerJuegoPorIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'El id debe ser un ObjectId válido',
    'string.length': 'El id debe tener 24 caracteres',
    'any.required': 'El id es obligatorio',
  })
});

export const eliminarJuegoSchema = obtenerJuegoPorIdSchema;

export const obtenerJuegosQuerySchema = Joi.object({
  nombre: Joi.string().trim().max(50).messages({
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
  }),
  categoria: Joi.string().hex().length(24).messages({
    'string.hex': 'El id de categoría debe ser un ObjectId válido',
    'string.length': 'El id de categoría debe tener 24 caracteres',
  }),
  precioMin: Joi.number().positive().messages({
    'number.base': 'El precio mínimo debe ser un número',
    'number.positive': 'El precio mínimo debe ser un número positivo',
  }),
  precioMax: Joi.number().positive().messages({
    'number.base': 'El precio máximo debe ser un número',
    'number.positive': 'El precio máximo debe ser un número positivo',
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'La página debe ser un número',
    'number.integer': 'La página debe ser un número entero',
    'number.min': 'La página debe ser mayor o igual a {#limit}',
  }),
  limit: Joi.number().integer().min(1).max(50).default(10).messages({
    'number.base': 'El límite debe ser un número',
    'number.integer': 'El límite debe ser un número entero',
    'number.min': 'El límite debe ser mayor o igual a {#limit}',
    'number.max': 'El límite no puede ser mayor a {#limit}',
  }),
});

export const obtenerPrecioConvertidoQuerySchema = Joi.object({
  moneda: Joi.string().length(3).uppercase().required().messages({
    'string.length': 'La moneda debe ser un código de 3 letras (ej: UYU, USD, EUR)',
    'any.required': 'Debe indicar la moneda a la que desea convertir el precio',
  }),
});