'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Osteos', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('Osteos', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Osteos', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('Osteos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
