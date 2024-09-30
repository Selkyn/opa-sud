const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false // Désactive l'ajout automatique de timestamps
});

module.exports = Role;