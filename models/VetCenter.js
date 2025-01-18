const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Contact = require('./Contact');

const VetCenter = sequelize.define('VetCenter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
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
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phone : {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true 
      },
      longitude: {
          type: DataTypes.FLOAT,
          allowNull: true 
      },
      infos: {
        type: DataTypes.STRING,
        allowNull: true
      },
    contactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
          model: Contact, 
          key: 'id'       
      }
  },
}, {
    timestamps: true
  });

  module.exports = VetCenter;