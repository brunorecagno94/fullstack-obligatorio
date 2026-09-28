import Joi from 'joi';

export const obtenerUsuarioPorIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'El id debe ser un ObjectId válido',
    'string.length': 'El id debe tener 24 caracteres',
    'any.required': 'El id es obligatorio',
  })
});

export const obtenerUsuarioPorNombreSchema = Joi.object({
  nombreUsuario: Joi.string().trim().lowercase().required().min(5).max(50).lowercase().messages({
    'string.base': 'El nombre de usuario debe ser una cadena de texto',
    'string.empty': 'El nombre de usuario no puede estar vacío',
    'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
  }),
});

export const comprarJuegoSchema = Joi.object({
    id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'El id debe ser un ObjectId válido',
    'string.length': 'El id debe tener 24 caracteres',
    'any.required': 'El id es obligatorio',
  })
})
