const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const StatusAppointment = require('./StatusAppointment');
const Patient = require('./Patient');
const VetCenter = require('./VetCenter');
const OsteoCenter = require('./OsteoCenter');
const ReasonAppointment = require('./ReasonAppointment');

const Appointment = sequelize.define('Appointment', {
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
    vetCenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: VetCenter, 
            key: 'id'       
        }
    },
    osteoCenterId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: OsteoCenter, 
            key: 'id'       
        }
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    infos: {
        type: DataTypes.STRING,
        allowNull: true
    },
    statusAppointmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: StatusAppointment, 
            key: 'id'       
        }
    },
    reasonAppointmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ReasonAppointment, 
            key: 'id'       
        }
    },  
}, {
    timestamps: true
});

module.exports = Appointment;
