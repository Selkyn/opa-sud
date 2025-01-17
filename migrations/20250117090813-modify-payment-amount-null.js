'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Modifier la colonne 'amount' pour permettre NULL
    await queryInterface.changeColumn('Payments', 'amount', {
      type: Sequelize.FLOAT,
      allowNull: true, // Permet les valeurs NULL
    });
  },

  async down(queryInterface, Sequelize) {
    // Revenir à l'état précédent si nécessaire
    await queryInterface.changeColumn('Payments', 'amount', {
      type: Sequelize.FLOAT,
      allowNull: false, // Rétablit le comportement d'origine
    });
  }
};
