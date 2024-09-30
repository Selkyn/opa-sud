const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const AnimalType = require('./AnimalType');

const Race = sequelize.define('Race', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    animalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AnimalType, 
            key: 'id'       
        }
    },
}, {
    timestamps: false
  });

  module.exports = Race;