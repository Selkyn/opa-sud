'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajouter la contrainte avec cascade
    await queryInterface.addConstraint('Races', {
      fields: ['animalTypeId'],
      type: 'foreign key',
      name: 'fk_races_animalTypeId', // Nom explicite de la contrainte
      references: {
        table: 'AnimalTypes',
        field: 'id',
      },
      onDelete: 'CASCADE', // Supprime les races associées
      onUpdate: 'CASCADE', // Met à jour les races si l'ID change
    });
  },

  async down(queryInterface, Sequelize) {
    // Supprimer la contrainte ajoutée
    await queryInterface.removeConstraint('Races', 'fk_races_animalTypeId');
  },
};
