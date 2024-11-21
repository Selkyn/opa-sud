module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Vets', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true
    });
    
    await queryInterface.addColumn('Vets', 'phone', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Vets', 'email');
    await queryInterface.removeColumn('Vets', 'phone');
  }
};