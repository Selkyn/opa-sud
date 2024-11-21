'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('OsteoCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.changeColumn('OsteoCenters', 'department', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('OsteoCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.changeColumn('OsteoCenters', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('OsteoCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('OsteoCenters', 'department', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('OsteoCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('OsteoCenters', 'phone', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
