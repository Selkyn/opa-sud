'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Clients', 'latitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
      }),
      queryInterface.addColumn('Clients', 'longitude', {
        type: Sequelize.FLOAT,
        allowNull: true,
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Clients', 'latitude'),
      queryInterface.removeColumn('Clients', 'longitude')
    ]);
  }
};
