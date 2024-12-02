'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Appointments', 'appointmentDate'); // Supprime la colonne existante

    await queryInterface.addColumn('Appointments', 'start_time', {
      type: Sequelize.DATE,
      allowNull: false, // Obligatoire
    });

    await queryInterface.addColumn('Appointments', 'end_time', {
      type: Sequelize.DATE,
      allowNull: true, // Optionnel
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Appointments', 'appointmentDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.removeColumn('Appointments', 'start_time');
    await queryInterface.removeColumn('Appointments', 'end_time');
  }
};
