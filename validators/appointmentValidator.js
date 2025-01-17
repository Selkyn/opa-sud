const Joi = require('joi');

const appointmentSchema = Joi.object({
    start_time: Joi.date().iso().required(), 
    start_time_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),// Date ISO pour s'assurer que le format est valide
    end_time: Joi.date().iso().required().greater(Joi.ref('start_time')), 
    end_time_hour: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(), // Heure au format HH:mm
    // Doit être après `start_time`
    participantType: Joi.string()
        .valid('patient', 'vetCenter', 'osteoCenter')
        .optional().allow(null, ''), // Accepte uniquement les valeurs spécifiées
    participantId: Joi.number().optional().allow(null, ''), // Doit être un nombre (patientId, vetCenterId, ou osteoCenterId)
    infos: Joi.string().optional().allow(null, ''), // Informations additionnelles
    statusAppointmentId: Joi.number().optional().allow(null, ''), // Statut requis
    reasonAppointmentId: Joi.number().optional().allow(null, ''), // Raison requise
})

module.exports = { appointmentSchema };