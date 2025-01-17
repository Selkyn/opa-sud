const Joi = require('joi');

const workScheduleSchema = Joi.object({
    start_time: Joi.date().iso().required(), 
    start_time_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),// Date ISO pour s'assurer que le format est valide
    end_time: Joi.date().iso().required().greater(Joi.ref('start_time')), 
    end_time_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), // Heure au format HH:mm
    patientId: Joi.number().optional().allow(null, ''), // Doit être un nombre (patientId, vetCenterId, ou osteoCenterId)
    taskId: Joi.number().optional().allow(null, ''), // Statut requis
    custom_task_name: Joi.string().optional().allow(null, ''),
})

module.exports = { workScheduleSchema };