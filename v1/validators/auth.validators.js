import Joi from 'joi';

export const loginSchema = Joi.object({
  nombreUsuario: Joi.string().trim().lowercase().required().messages({
    'any.required': 'El nombre de usuario es obligatorio',
    'string.empty': 'El nombre de usuario no puede estar vacío'
  }),
  password: Joi.string().required().messages({
    'any.required': 'La contraseña es obligatoria',
    'string.empty': 'La contraseña no puede estar vacía'
  })
});

export const registroSchema = Joi.object({
  nombreUsuario: Joi.string().trim().lowercase().required().min(5).max(50).lowercase().messages({
    'string.base': 'El nombre de usuario debe ser una cadena de texto',
    'string.empty': 'El nombre de usuario no puede estar vacío',
    'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres',
  }),
  email: Joi.string().trim().lowercase().required().email().lowercase().messages({
    'string.base': 'El email debe ser una cadena de texto',
    'string.empty': 'El email no puede estar vacío',
    'string.email': 'Ingrese un email válido',
  }),
  password: Joi.string().required().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/).messages({
    'string.base': 'La contraseña debe ser una cadena de texto',
    'string.empty': 'La contraseña no puede estar vacía',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.max': 'La contraseña debe tener como máximo {#limit} caracteres',
    'string.pattern.base': 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
  }),
  repetirPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.base': 'La confirmación de la contraseña debe ser una cadena de texto',
    'string.empty': 'La confirmación de la contraseña no puede estar vacía',
    'any.only': 'Las contraseñas no coinciden',
  }),
  fechaNacimiento: Joi.date().required().less('now').messages({
    'date.base': 'Ingresa una fecha válida',
    'date.empty': 'Tu fecha de nacimiento no puede estar vacía',
    'date.less': 'Tu fecha de nacimiento debe ser anterior a la fecha actual',
  }),
  nombre: Joi.string().trim().optional().max(50).messages({
    'string.base': 'El primer nombre debe ser una cadena de texto',
    'string.max': 'El primer nombre no puede tener más de {#limit} caracteres',
  }),
  apellido: Joi.string().trim().optional().max(50).messages({
    'string.base': 'El apellido debe ser una cadena de texto',
    'string.max': 'El apellido no puede tener más de {#limit} caracteres',
  }),
  pais: Joi.string().trim().optional().max(50).messages({
    'string.base': 'El país debe ser una cadena de texto',
    'string.max': 'El país no puede tener más de {#limit} caracteres',
  }),
});