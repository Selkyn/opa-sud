const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Status = sequelize.define('Status', {
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

  module.exports = Status;