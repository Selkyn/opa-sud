'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Patients', 'birthday');
    await queryInterface.addColumn('Patients', 'birthYear', {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: new Date().getFullYear()
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Patients', 'birthYear');
    await queryInterface.addColumn('Patients', 'birthday', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  }
};
