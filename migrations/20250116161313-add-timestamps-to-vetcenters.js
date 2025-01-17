'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajouter la colonne createdAt
    await queryInterface.addColumn('VetCenters', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valeur par défaut
    });

    // Ajouter la colonne updatedAt
    await queryInterface.addColumn('VetCenters', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valeur par défaut
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la colonne createdAt
    await queryInterface.removeColumn('VetCenters', 'createdAt');

    // Supprimer la colonne updatedAt
    await queryInterface.removeColumn('VetCenters', 'updatedAt');
  },
};
