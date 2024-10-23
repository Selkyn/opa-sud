'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Supprimer les colonnes 'createdAt' et 'updatedAt' de la table 'PatientLimb'
    await queryInterface.removeColumn('PatientLimb', 'createdAt');
    await queryInterface.removeColumn('PatientLimb', 'updatedAt');
  },

  down: async (queryInterface, Sequelize) => {
    // Recréer les colonnes 'createdAt' et 'updatedAt' en cas de rollback
    await queryInterface.addColumn('PatientLimb', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('PatientLimb', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  }
};
