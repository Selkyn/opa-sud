'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modifier la colonne `adress` pour qu'elle soit NOT NULL
    await queryInterface.changeColumn('Clients', 'adress', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revenir à allowNull: true pour `adress`
    await queryInterface.changeColumn('Clients', 'adress', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
