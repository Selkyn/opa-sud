const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Sex = require('./Sex');
const OsteoCenter = require('./OsteoCenter');

const Osteo = sequelize.define('Osteo', {
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
        allowNull: true,
        unique: true
    },
    phone : {
        type: DataTypes.STRING,
        allowNull: true
      },
    sexId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Sex, 
            key: 'id'       
        }
    },
    osteoCenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: OsteoCenter, 
            key: 'id'       
        }
    },
}, {
    timestamps: false
  });

  module.exports = Osteo;