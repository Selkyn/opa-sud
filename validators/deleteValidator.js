const Joi = require('joi');

const deleteSchema = Joi.object({
    id: Joi.number().integer().required()
});

module.exports = { deleteSchema };