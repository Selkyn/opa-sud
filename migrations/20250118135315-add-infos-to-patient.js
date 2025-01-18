'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Modifier `pathology` pour `allowNull: true`
    await queryInterface.changeColumn('Patients', 'pathology', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Ajouter la colonne `infos`
    await queryInterface.addColumn('Patients', 'infos', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revenir à `allowNull: false` pour `pathology`
    await queryInterface.changeColumn('Patients', 'pathology', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Supprimer la colonne `infos`
    await queryInterface.removeColumn('Patients', 'infos');
  },
};
