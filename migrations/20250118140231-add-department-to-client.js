'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ajouter la colonne `department`
    await queryInterface.addColumn('Clients', 'department', {
      type: Sequelize.STRING,
      allowNull: true, // Permettre les valeurs nulles
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer la colonne `department`
    await queryInterface.removeColumn('Clients', 'department');
  },
};
