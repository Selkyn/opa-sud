'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Supprimer la contrainte actuelle sur patientId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId').catch(() => {});

    // Ajouter une nouvelle contrainte sans ON DELETE CASCADE
    await queryInterface.addConstraint('Appointments', {
      fields: ['patientId'],
      type: 'foreign key',
      name: 'fk_appointments_patientId', // Nom explicite pour la contrainte
      references: {
        table: 'Patients',
        field: 'id',
      },
      onDelete: 'SET NULL', // Ou 'NO ACTION' selon tes besoins
      onUpdate: 'CASCADE',
    });

    // Supprimer la contrainte actuelle sur vetCenterId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_vetCenterId').catch(() => {});

    // Ajouter une nouvelle contrainte sans ON DELETE CASCADE
    await queryInterface.addConstraint('Appointments', {
      fields: ['vetCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_vetCenterId',
      references: {
        table: 'VetCenters',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Supprimer la contrainte actuelle sur osteoCenterId
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_osteoCenterId').catch(() => {});

    // Ajouter une nouvelle contrainte sans ON DELETE CASCADE
    await queryInterface.addConstraint('Appointments', {
      fields: ['osteoCenterId'],
      type: 'foreign key',
      name: 'fk_appointments_osteoCenterId',
      references: {
        table: 'OsteoCenters',
        field: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer les nouvelles contraintes
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_patientId');
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_vetCenterId');
    await queryInterface.removeConstraint('Appointments', 'fk_appointments_osteoCenterId');

    // Réinstaller les contraintes avec ON DELETE CASCADE
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
};
