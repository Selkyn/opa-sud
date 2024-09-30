const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Patient = require('./Patient');

const Follow = sequelize.define('Follow', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Patient, 
            key: 'id'       
        }
    },
}, {
    timestamps: false
  });

  module.exports = Follow;