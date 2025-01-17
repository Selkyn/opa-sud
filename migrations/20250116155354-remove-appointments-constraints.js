'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprimer la contrainte sur patientId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId');

    // Supprimer la contrainte sur vetCenterId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_vetCenterId');

    // Supprimer la contrainte sur osteoCenterId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_osteoCenterId');
  },

  async down(queryInterface, Sequelize) {
    // Réajouter la contrainte sur patientId
    await queryInterface.addConstraint('Appointments', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_appointments_patientId',
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    // Réajouter la contrainte sur vetCenterId
    await queryInterface.addConstraint('Appointments', {
      fields: ['vetCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_vetCenterId',
      references: {
        table: 'VetCenters',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });

    // Réajouter la contrainte sur osteoCenterId
    await queryInterface.addConstraint('Appointments', {
      fields: ['osteoCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_osteoCenterId',
      references: {
        table: 'OsteoCenters',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
};
