'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('VetCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('VetCenters', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('VetCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('VetCenters', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('VetCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('VetCenters', 'department', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('VetCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('VetCenters', 'phone', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};