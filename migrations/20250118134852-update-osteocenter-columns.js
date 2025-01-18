'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modifier `adress` pour `allowNull: false`
    await queryInterface.changeColumn('OsteoCenters', 'adress', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Modifier `city` pour `allowNull: false`
    await queryInterface.changeColumn('OsteoCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Modifier `postal` pour `allowNull: false`
    await queryInterface.changeColumn('OsteoCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revenir à `allowNull: true` pour `adress`
    await queryInterface.changeColumn('OsteoCenters', 'adress', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Revenir à `allowNull: true` pour `city`
    await queryInterface.changeColumn('OsteoCenters', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Revenir à `allowNull: true` pour `postal`
    await queryInterface.changeColumn('OsteoCenters', 'postal', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
