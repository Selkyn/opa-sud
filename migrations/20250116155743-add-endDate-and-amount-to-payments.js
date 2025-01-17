'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajouter la colonne endDate
    await queryInterface.addColumn('Payments', 'endDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Ajouter la colonne amount
    await queryInterface.addColumn('Payments', 'amount', {
      type: Sequelize.FLOAT, // Utilise FLOAT pour représenter des montants
      allowNull: false, // Si tu veux rendre ce champ obligatoire
      defaultValue: 0, // Optionnel : Ajoute une valeur par défaut
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la colonne endDate
    await queryInterface.removeColumn('Payments', 'endDate');

    // Supprimer la colonne amount
    await queryInterface.removeColumn('Payments', 'amount');
  },
};
