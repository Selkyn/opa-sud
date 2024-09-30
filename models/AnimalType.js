const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const AnimalType = sequelize.define('AnimalType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
  });

  module.exports = AnimalType;