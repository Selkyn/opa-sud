const sequelize = require("../sequelize")

const { DataTypes } = require('sequelize')

const ReasonAppointment = sequelize.define('ReasonAppointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
  });

  module.exports = ReasonAppointment;