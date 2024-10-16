const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Sex = require('./Sex');

const Client = sequelize.define('Client', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phone : {
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
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true // ou false selon le cas
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true // ou false selon le cas
    }
}, {
    timestamps: false
  });

  module.exports = Client;