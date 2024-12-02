const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Patient= require('./Patient');
const Task = require('./Task');

const WorkSchedule = sequelize.define('WorkSchedule', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Patient, 
            key: 'id'       
        }
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Task, 
            key: 'id'       
        }
    },
    custom_task_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = WorkSchedule;