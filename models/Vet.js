const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Sex = require('./Sex');
const VetCenter = require('./VetCenter');

const Vet = sequelize.define('Vet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Sex, 
            key: 'id'       
        }
    },
    vetCenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: VetCenter, 
            key: 'id'       
        }
    },
}, {
    timestamps: false
  });

  module.exports = Vet;