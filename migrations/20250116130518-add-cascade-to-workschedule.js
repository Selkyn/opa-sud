'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    

    // Ajouter une contrainte avec cascade pour Patient ↔ WorkSchedule
    await queryInterface.addConstraint('WorkSchedules', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_workschedules_patientId', // Nom explicite pour la contrainte
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'CASCADE', // Supprime les WorkSchedules si le Patient est supprimé
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la contrainte ajoutée
    await queryInterface.removeConstraint('WorkSchedules', 'fk_workschedules_patientId');
  },
};
