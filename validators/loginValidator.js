const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'L\'email est requis.',
        'string.email': 'L\'email doit être une adresse valide.',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Le mot de passe est requis.',
        'string.min': 'Le mot de passe doit contenir au moins 6 caractères.',
    }),
});

module.exports = { loginSchema };
