const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Sex = sequelize.define('Sex', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: false
  });

  module.exports = Sex;