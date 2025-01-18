'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modifier la colonne `adress` pour définir `allowNull: false`
    await queryInterface.changeColumn('VetCenters', 'adress', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revenir à `allowNull: true` pour `adress`
    await queryInterface.changeColumn('VetCenters', 'adress', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
