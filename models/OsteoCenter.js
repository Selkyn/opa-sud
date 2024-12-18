const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Contact = require('./Contact');

const OsteoCenter = sequelize.define('OsteoCenter', {
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
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
      postal: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      phone : {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true // ou false selon le cas
      },
      longitude: {
          type: DataTypes.FLOAT,
          allowNull: true // ou false selon le cas
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
    timestamps: false
  });

  module.exports = OsteoCenter;