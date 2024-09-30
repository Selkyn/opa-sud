const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Role = require('./Role');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Role, 
            key: 'id'       
        }
    },
}, {
    timestamps: false
  });

  module.exports = User;