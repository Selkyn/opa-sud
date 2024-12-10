const Patient = require('../models/Patient');
const WorkSchedule = require('../models/WorkSchedule');
const Task = require('../models/Task');
const moment = require("moment-timezone");

exports.getWorkSchedules = async (req, res) => {
  try {
      const timezone = req.query.timezone || "Europe/Paris";

      const workSchedules = await WorkSchedule.findAll({
          include: [
              { model: Patient, as: 'patient' },
              { model: Task, as: 'task' },
          ],
      });

      const formattedWorkSchedules = workSchedules.map((workSchedule) => {
          const start_time_local = moment(workSchedule.start_time)
              .tz(timezone)
              .format("YYYY-MM-DDTHH:mm:ss"); // Format ISO

          const end_time_local = workSchedule.end_time
              ? moment(workSchedule.end_time)
                    .tz(timezone)
                    .format("YYYY-MM-DDTHH:mm:ss")
              : null;

          return {
              id: workSchedule.id,
              title: workSchedule.task?.name || workSchedule.custom_task_name || "Tâche",
              start: start_time_local,
              end: end_time_local,
              eventType: "workSchedule",
              extendedProps: {
                  patientId: workSchedule.patientId || null,
                  entityName: workSchedule.patient?.name || null,
                  entityUrl: workSchedule.patient
                      ? `/patients/${workSchedule.patientId}`
                      : "#",
                  taskId: workSchedule.task?.id || null,
              },
          };
      });

      res.status(200).json(formattedWorkSchedules);
  } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
      res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
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

exports.editWorkSchedule = async (req, res) => {
    const { id } = req.params;
    const { start_time, end_time, patientId, taskId, custom_task_name } = req.body;
  
    try {
      // Vérifiez que la tâche existe
      const workSchedule = await WorkSchedule.findByPk(id, {
        include: [
          { model: Patient, as: 'patient' },
          { model: Task, as: 'task' },
        ],
      });
      if (!workSchedule) {
        return res.status(404).json({ message: "Tâche de travail non trouvée" });
      }
  
      // Mettez à jour la tâche
      await workSchedule.update({
        start_time,
        end_time,
        patientId: patientId || null,
        taskId: taskId || null,
        custom_task_name: custom_task_name || null,
      });
  
      // Rechargez les données complètes
      const updatedWorkSchedule = await WorkSchedule.findByPk(id, {
        include: [
          { model: Patient, as: 'patient' },
          { model: Task, as: 'task' },
        ],
      });
  
      res.status(200).json({
        message: "Tâche de travail mise à jour avec succès",
        workSchedule: {
          id: updatedWorkSchedule.id,
          title: updatedWorkSchedule.task?.name || updatedWorkSchedule.custom_task_name || "Tache",
          start: updatedWorkSchedule.start_time,
          end: updatedWorkSchedule.end_time,
          eventType: "workSchedule",
          extendedProps: {
            patientId: updatedWorkSchedule.patientId,
            entityName: updatedWorkSchedule.patient?.name,
            taskId: updatedWorkSchedule.taskId,
            customTaskName: updatedWorkSchedule.custom_task_name,
          },
        },
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche de travail :", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche de travail" });
    }
  };
  
  

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