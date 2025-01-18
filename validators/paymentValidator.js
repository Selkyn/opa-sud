const Joi = require('joi');

const paymentSchema = Joi.object({
    paymentTypeId: Joi.number().integer().optional().allow(null),
    paymentModeId: Joi.number().integer().optional().allow(null),
    paymentStatusId: Joi.number().integer().optional().allow(null),
    date: Joi.date().optional().allow(null),
    endDate: Joi.date().optional().allow(null),
    amount: Joi.number().positive().optional().allow(null),
})

module.exports = { paymentSchema };