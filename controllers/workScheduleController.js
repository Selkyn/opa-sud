const Patient = require('../models/Patient');
const WorkSchedule = require('../models/WorkSchedule');
const Task = require('../models/Task');

exports.getWorkSchedules = async (req, res) => {
    try {
        const workSchedules = await WorkSchedule.findAll({
            include: [
                {model: Patient, as: 'patient'},
                {model: Task, as: 'task'}
            ]
        })

        const formattedAppointments = workSchedules.map((workSchedule) => ({
            id: workSchedule.id,
            title: workSchedule.task?.name || custom_task_name || "Tache",
            start: workSchedule.start_time,
            end: workSchedule.end_time || null,
            eventType: "workSchedule",
            extendedProps: {
                patientId: workSchedule.patiendId,
                entityName: workSchedule.patient?.name,
                entityUrl : workSchedule ? `/patients/${workSchedule.patientId}`: "#"
            }
        }))

        res.status(200).json(formattedAppointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des taches :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des taches"})
    }
};

exports.addWorkSchedules = async (req, res) => {
    try {
        const {
            start_time,
            end_time,
            patientId,
            taskId,
            custom_task_name
        } = req.body
        
        const workSchedule = await WorkSchedule.create({
            start_time,
            end_time,
            patientId: patientId || null,
            taskId,
            custom_task_name: custom_task_name || null
        })

        return res.status(201).json({
            message: "Tache de travail créée avec succès.",
            workSchedule
        })
    } catch (error) {
        console.error("Erreur lors de la création de la tache de travail :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la création de la tache de travail." });
    }
}

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Erreur lors de la récupération des taches:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des taches" });
    }
}

exports.deleteWorkSchedule = async (req, res) => {
    try {
        const workScheduleId = req.params.id;
        const workSchedule = await WorkSchedule.findByPk(workScheduleId);

        await workSchedule.destroy();

        res.status(200).json({ message: "Tache de travail supprimé avec succès"})
    } catch (error) {
        console.error("Erreur lors de la suppression de la tache de travail :", error);
        res.status(400).json({ error });
    }
}