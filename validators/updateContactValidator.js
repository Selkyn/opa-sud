const Joi = require('joi');

const updateContactSchema = Joi.object({
    contactId: Joi.number().integer().optional().allow(null),
})

module.exports = { updateContactSchema }