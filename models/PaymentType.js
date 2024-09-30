const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PaymentType = sequelize.define('PaymentType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
  });

  module.exports = PaymentType;