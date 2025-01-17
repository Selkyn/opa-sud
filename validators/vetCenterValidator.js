const Joi = require('joi');

const vetSchema = Joi.object({
    id: Joi.number().optional().allow(null), // ID optionnel, peut être null
    firstname: Joi.string().min(2).optional().allow(null, ''), // Optionnel
    lastname: Joi.string().min(2).optional().allow(null, ''),  // Optionnel
    email: Joi.string().email().optional().allow(null, ''),    // Optionnel
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),    // Optionnel
});

// Schéma pour valider un centre d'ostéopathie
const vetCenterSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    adress: Joi.string().required(),
    city: Joi.string().required(),
    postal: Joi.string()
    .pattern(/^\d{5}$/) // Doit être une chaîne de 5 chiffres
    .required()
    .strict(false),
    department: Joi.string().allow(null, ''),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).required(),
    infos: Joi.string().allow(null, ''),
    vets: Joi.array().items(vetSchema).optional().allow(null), // Tableau optionnel
    staff: Joi.array().items(vetSchema).optional().allow(null),
});

module.exports = { vetSchema, vetCenterSchema };