const AnimalType = require('../models/AnimalType');
const Patient = require('../models/Patient');
const Race = require('../models/Race');
const Client = require('../models/Client');
const VetCenter = require('../models/VetCenter');
const OsteoCenter = require('../models/OsteoCenter');
const Appointment = require('../models/Appointment');
const StatusAppointment = require('../models/StatusAppointment');
const ReasonAppointment = require('../models/ReasonAppointment');
const axios = require('axios');

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                { model: Patient, as: 'patient' },
                { model: VetCenter, as: 'vetCenter' },
                { model: OsteoCenter, as: 'osteoCenter' },
                { model: ReasonAppointment, as: 'reasonAppointment' },
                { model: StatusAppointment, as: 'statusAppointment' }
            ]
        });

        // Transformation des rendez-vous pour FullCalendar
        const formattedAppointments = appointments.map((appointment) => ({
            title: appointment.reasonAppointment?.name || "Rendez-vous",
            start: appointment.appointmentDate,
            end: null,
            extendedProps: {
                patientId: appointment.patientId,
                entityType: appointment.patient?.id 
                ? "Patient" 
                : appointment.osteoCenter?.id
                ? "Ostéopathe" 
                : appointment.vetCenter?.id
                ? "Vétérinaire"
                : "Cible inconnu",
                entityName: appointment.patient?.name 
                    || appointment.vetCenter?.name 
                    || appointment.osteoCenter?.name 
                    || "Inconnu",
                entityUrl: appointment.patient
                    ? `/patients/${appointment.patientId}`
                    : appointment.vetCenter
                    ? `/centres-veterinaires/${appointment.vetCenterId}`
                    : appointment.osteoCenter
                    ? `/centres-osteopathes/${appointment.osteoCenterId}`
                    : "#",
                vetCenterId: appointment.vetCenterId,
                osteoCenterId: appointment.osteoCenterId,
                infos: appointment.infos,
                status: appointment.statusAppointment?.name
            }
        }));

        res.status(200).json(formattedAppointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des RDV :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des RDV" });
    }
};

exports.addAppointments = async (req, res ) => {
    try {
        const {
            appointmentDate,
            patientId,
            vetCenterId,
            osteoCenterId,
            infos,
            statusAppointmentId,
            reasonAppointmentId
        } = req.body

        if (new Date(appointmentDate) <= new Date()) {
            return res.status(400).json({ message: "La date du rendez-vous doit être dans le futur." });
        }

        const appointment = await Appointment.create({
            appointmentDate,
            patientId: patientId || null,
            vetCenterId: vetCenterId || null,
            osteoCenterId: osteoCenterId || null,
            infos,
            statusAppointmentId,
            reasonAppointmentId
        });

        return res.status(201).json({
            message: "Rendez-vous créé avec succès.",
            appointment
        });
    } catch (error) {
        console.error("Erreur lors de la création du rendez-vous :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la création du rendez-vous." });
    }
};

exports.getStatusAppointments = async ( req, res ) => {
    try {
        const statusAppointments = await StatusAppointment.findAll();
        console.log(statusAppointments)
        res.status(200).json(statusAppointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des status de RDV :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des status de RDV" });
    }
}

exports.getReasonAppointments = async ( req, res ) => {
    try {
        const reasonAppointments = await ReasonAppointment.findAll();
        console.log(reasonAppointments)
        res.status(200).json(reasonAppointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des raisons de RDV :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des raisons de RDV" });
    }
}