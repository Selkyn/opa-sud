'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajouter la colonne createdAt
    await queryInterface.addColumn('OsteoCenters', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valeur par défaut
    });

    // Ajouter la colonne updatedAt
    await queryInterface.addColumn('OsteoCenters', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'), // Valeur par défaut
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la colonne createdAt
    await queryInterface.removeColumn('OsteoCenters', 'createdAt');

    // Supprimer la colonne updatedAt
    await queryInterface.removeColumn('OsteoCenters', 'updatedAt');
  },
};
