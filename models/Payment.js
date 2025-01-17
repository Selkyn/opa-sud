const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const PaymentType = require('./PaymentType');
const PaymentMode = require('./PaymentMode');
const PaymentStatus = require('./PaymentStatus');

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: { // Nouvelle colonne pour la date de fin
        type: DataTypes.DATE,
        allowNull: true,
    },
    amount: { 
        type: DataTypes.FLOAT, 
        allowNull: true, 
    },
    paymentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentType, 
            key: 'id'       
        }
    },
    paymentModeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentMode, 
            key: 'id'       
        }
    },
    paymentStatusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentStatus, 
            key: 'id'       
        }
    }
}, {
    timestamps: false
  });

  module.exports = Payment;