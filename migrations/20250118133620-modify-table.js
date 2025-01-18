'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer la colonne `department`
    await queryInterface.removeColumn('Clients', 'department');

    // Modifier la colonne `adress` pour qu'elle soit NOT NULL
    await queryInterface.changeColumn('Clients', 'adress', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Ajouter de nouveau la colonne `department`
    await queryInterface.addColumn('Clients', 'department', {
      type: Sequelize.STRING,
      allowNull: false, // Si nécessaire, adapte cette valeur
    });

    // Revenir à allowNull: true pour `adress`
    await queryInterface.changeColumn('Clients', 'adress', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
