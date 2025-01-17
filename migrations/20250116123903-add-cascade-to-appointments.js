'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprimer les anciennes contraintes si elles existent
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId').catch(() => {});
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_vetCenterId').catch(() => {});
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_osteoCenterId').catch(() => {});

    // Ajouter une contrainte avec cascade pour Patient ↔ Appointment
    await queryInterface.addConstraint('Appointments', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_appointments_patientId',
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Ajouter une contrainte avec cascade pour VetCenter ↔ Appointment
    await queryInterface.addConstraint('Appointments', {
      fields: ['vetCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_vetCenterId',
      references: {
        table: 'VetCenters',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // Ajouter une contrainte avec cascade pour OsteoCenter ↔ Appointment
    await queryInterface.addConstraint('Appointments', {
      fields: ['osteoCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_osteoCenterId',
      references: {
        table: 'OsteoCenters',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer les contraintes ajoutées
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId');
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_vetCenterId');
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_osteoCenterId');
  },
};
