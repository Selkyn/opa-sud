'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprimer l'ancienne contrainte sur patientId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId');

    // Ajouter une nouvelle contrainte avec RESTRICT
    await queryInterface.addConstraint('Appointments', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_appointments_patientId', // Nom explicite pour la contrainte
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'RESTRICT', // Pas de suppression automatique
      onUpdate: 'CASCADE', // Met à jour si l'ID change
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la contrainte ajoutée
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId');

    // Réajouter l'ancienne contrainte si rollback
    await queryInterface.addConstraint('Appointments', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_appointments_patientId',
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'RESTRICT', // Garde le même comportement
      onUpdate: 'CASCADE',
    });
  },
};
