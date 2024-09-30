const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Contact = sequelize.define('Contact', {
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

  module.exports = Contact;