'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('VetCenters', 'latitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
      }),
      queryInterface.addColumn('VetCenters', 'longitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('VetCenters', 'latitude'),
      queryInterface.removeColumn('VetCenters', 'longitude')
    ]);
  }
};
