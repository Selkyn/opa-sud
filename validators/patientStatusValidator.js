const Joi = require('joi');

const patientStatusSchema = Joi.object({
    statusId: Joi.number().required()
})

module.exports= { patientStatusSchema };