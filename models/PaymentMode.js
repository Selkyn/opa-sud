const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PaymentMode = sequelize.define('PaymentMode', {
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

  module.exports = PaymentMode;