'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajouter la contrainte avec cascade pour VetCenter ↔ Vet
    await queryInterface.addConstraint('Vets', {
      fields: ['vetCenterId'], // Colonne concernée
      type: 'foreign key',
      name: 'fk_vets_vetCenterId', // Nom de la contrainte
      references: {
        table: 'VetCenters',
        field: 'id',
      },
      onDelete: 'CASCADE', // Supprime les Vets associés
      onUpdate: 'CASCADE', // Met à jour les Vets si l'ID change
    });

    // Ajouter la contrainte avec cascade pour OsteoCenter ↔ Osteo
    await queryInterface.addConstraint('Osteos', {
      fields: ['osteoCenterId'], // Colonne concernée
      type: 'foreign key',
      name: 'fk_osteos_osteoCenterId', // Nom de la contrainte
      references: {
        table: 'OsteoCenters',
        field: 'id',
      },
      onDelete: 'CASCADE', // Supprime les Osteos associés
      onUpdate: 'CASCADE', // Met à jour les Osteos si l'ID change
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer les contraintes ajoutées
    await queryInterface.removeConstraint('Vets', 'fk_vets_vetCenterId');
    await queryInterface.removeConstraint('Osteos', 'fk_osteos_osteoCenterId');
  },
};
