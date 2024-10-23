const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Limb = sequelize.define('Limb', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = Limb;