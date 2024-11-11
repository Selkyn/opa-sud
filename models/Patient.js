const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Client = require('./Client');
const Situation = require('./Situation');
const Payment = require('./Payment');
const Status = require('./Status');
const Sex = require('./Sex');
const VetCenter = require('./VetCenter');
const AnimalType = require('./AnimalType');
const Race = require('./Race');

const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1900,
            max: new Date().getFullYear()
        }
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pathology: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Client, 
            key: 'id'       
        }
    },
    situationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Situation, 
            key: 'id'       
        }
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Payment, 
            key: 'id'       
        }
    },
    statusId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Status, 
            key: 'id'       
        }
    },
    sexId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Sex, 
            key: 'id'       
        }
    },
    vetCenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: VetCenter, 
            key: 'id'       
        }
    },
    animalTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: AnimalType, 
            key: 'id'       
        }
    },
    raceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Race, 
            key: 'id'       
        }
    },
}, {
    timestamps: true
  });

module.exports = Patient;
