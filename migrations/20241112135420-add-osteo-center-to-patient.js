'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Patients', 'osteoCenterId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'OsteoCenters',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Patients', 'osteoCenterId');
  }
};
