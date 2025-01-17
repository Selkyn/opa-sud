'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Créer la table PaymentStatus
    await queryInterface.createTable('PaymentStatuses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    // Ajouter la colonne paymentStatusId à la table Payments
    await queryInterface.addColumn('Payments', 'paymentStatusId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'PaymentStatuses',
        key: 'id',
      },
      onDelete: 'SET NULL', // Si un PaymentStatus est supprimé, garde la valeur NULL dans Payments
      onUpdate: 'CASCADE', // Si l'ID change, mets à jour Payments
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la colonne paymentStatusId de la table Payments
    await queryInterface.removeColumn('Payments', 'paymentStatusId');

    // Supprimer la table PaymentStatus
    await queryInterface.dropTable('PaymentStatuses');
  },
};
