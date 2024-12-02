const AnimalType = require('./AnimalType');
const Client = require('./Client');
const Contact = require('./Contact');
const Situation = require('./Situation');
const Patient = require('./Patient');
const Payment = require('./Payment');
const PaymentMode = require('./PaymentMode');
const PaymentType = require('./PaymentType');
const Sex = require('./Sex');
const Status = require('./Status');
const Vet = require('./Vet');
const VetCenter = require('./VetCenter');
const Follow = require('./Follow');
const Race = require('./Race');
const User = require('./User');
const Role = require('./Role');
const Limb = require('./Limb');;
const Osteo = require('./Osteo');
const OsteoCenter= require('./OsteoCenter');
const { Association } = require('sequelize');
const Appointment = require('./Appointment');
const StatusAppointment = require('./StatusAppointment');
const ReasonAppointment = require('./ReasonAppointment');
const WorkSchedule = require('./WorkSchedule');
const Task = require('./Task');


// Fonction pour définir toutes les associations
const setupAssociations = () => {
    //ASSOCIATION PATIENT
    // Association Patient <-> Client
    Patient.belongsTo(Client, {
        foreignKey: 'clientId',
        as: 'client'
    });
    Client.hasMany(Patient, {
        foreignKey: 'clientId',
        as: 'patients'
    });

    // Association Patient <-> Situation
    Patient.belongsTo(Situation, {
        foreignKey: 'situationId',
        as: 'situation'
    });
    Situation.hasMany(Patient, {
        foreignKey: 'situationId',
        as: 'patients'
    });

    // Association Patient <-> Payment
    Patient.belongsTo(Payment, {
        foreignKey: 'paymentId',
        as: 'payment'
    });
    Payment.hasMany(Patient, {
        foreignKey: 'paymentId',
        as: 'patients'
    });

    // Association Patient <-> Status
    Patient.belongsTo(Status, {
        foreignKey: 'statusId',
        as: 'status'
    });
    Status.hasMany(Patient, {
        foreignKey: 'statusId',
        as: 'patients'
    });

    // Association Patient <-> Sex
    Patient.belongsTo(Sex, {
        foreignKey: 'sexId',
        as: 'sex'
    });
    Sex.hasMany(Patient, {
        foreignKey: 'sexId',
        as: 'patients'
    });

    // Association Patient <-> VetCenter
    Patient.belongsTo(VetCenter, {
        foreignKey: 'vetCenterId',
        as: 'vetCenter'
    });
    VetCenter.hasMany(Patient, {
        foreignKey: 'vetCenterId',
        as: 'patients'
    });

    // Association Patient <-> OsteoCenter
    Patient.belongsTo(OsteoCenter, {
        foreignKey: 'osteoCenterId',
        as: 'osteoCenter'
    });
    OsteoCenter.hasMany(Patient, {
        foreignKey: 'osteoCenterId',
        as: 'patients'
    });

    // Association Patient <-> AnimalType
    Patient.belongsTo(AnimalType, {
        foreignKey: 'animalTypeId',
        as: 'animalType'
    });
    AnimalType.hasMany(Patient, {
        foreignKey: 'animalTypeId',
        as: 'patients'
    });

    Patient.belongsTo(Race, {
        foreignKey: 'raceId',
        as: 'race'
    });
    Race.hasMany(Patient, {
        foreignKey: 'raceId',
        as: 'patients'
    });
    // END ASSOCIATION PATIENT

    //ASSOCIATION ANIMALTYPE
    Race.belongsTo(AnimalType, {
        foreignKey: 'animalTypeId',
        as: 'animalType'
    });
    AnimalType.hasMany(Race, {
        foreignKey: 'animalTypeId',
        as: 'races'
    });

    //ASSOCIATION FOLLOW
    Follow.belongsTo(Patient, {
        foreignKey: 'patientId',
        as: 'patient'
    });
    Patient.hasMany(Follow, {
        foreignKey: 'paitendId',
        as: 'follows'
    })

    //ASSOCIATION PAYMENT
    Payment.belongsTo(PaymentType, {
        foreignKey: 'paymentTypeId',
        as: 'paymentType'
    });
    PaymentType.hasMany(Payment, {
        foreignKey: 'paymentTypeId',
        as: 'payments'
    });

    Payment.belongsTo(PaymentMode, {
        foreignKey: 'paymentModeId',
        as: 'paymentMode'
    });
    PaymentMode.hasMany(Payment, {
        foreignKey: 'paymentModeId',
        as: 'payments'
    });
    // END ASSOCIATION PAYMENT

    //ASSOCIATION VETCENTER
    VetCenter.belongsTo(Contact, {
        foreignKey: 'contactId',
        as: 'contact'
    });
    Contact.hasMany(VetCenter, {
        foreignKey: 'contactId',
        as: 'vetCenters'
    });

    //ASSOCIATION VET
    Vet.belongsTo(VetCenter, {
        foreignKey: 'vetCenterId',
        as: 'vetCenter'
    });
    VetCenter.hasMany(Vet, {
        foreignKey: 'vetCenterId',
        as: 'vets'
    });

    Vet.belongsTo(Sex, {
        foreignKey: 'sexId',
        as: 'sex'
    });
    Sex.hasMany(Vet, {
        foreignKey: 'sexId',
        as: 'vets'
    });

    //ASSOCIATION OSTEOCENTER
    OsteoCenter.belongsTo(Contact, {
        foreignKey: 'contactId',
        as: 'contact'
    });
    Contact.hasMany(OsteoCenter, {
        foreignKey: 'contactId',
        as: 'osteoCenters'
    });

    //ASSOCIATION OSTEO
    Osteo.belongsTo(OsteoCenter, {
        foreignKey: 'osteoCenterId',
        as: 'osteoCenter'
    });
    OsteoCenter.hasMany(Osteo, {
        foreignKey: 'osteoCenterId',
        as: 'osteos'
    });

    Osteo.belongsTo(Sex, {
        foreignKey: 'sexId',
        as: 'sex'
    });
    Sex.hasMany(Osteo, {
        foreignKey: 'sexId',
        as: 'osteos'
    });

    //ASSOCIATION CLIENT
    Client.belongsTo(Sex, {
        foreignKey: 'sexId',
        as: 'sex'
    });
    Sex.hasMany(Client, {
        foreignKey: 'sexId',
        as: 'clients'
    });

    //ASSOCIATION User
    User.belongsTo(Role, {
        foreignKey: 'roleId',
        as: 'role'
    });
    Role.hasMany(User, {
        foreignKey: 'roleId',
        as: 'users'
    });

    //ASSOCIATION limb
    Patient.belongsToMany(Limb, {
        through: 'PatientLimb',
        foreignKey: 'patientId',
        timestamps: false
    });
    
    // Association côté Limb
    Limb.belongsToMany(Patient, {
        through: 'PatientLimb',
        foreignKey: 'limbId',
        timestamps: false
    });

    //ASSOCIATION RDV
    Appointment.belongsTo(Patient, {
        foreignKey: 'patientId',
        as: 'patient'
    });
    Patient.hasMany(Appointment, {
        foreignKey: 'patientId',
        as: 'patientAppointments'
    });
    Appointment.belongsTo(VetCenter, {
        foreignKey: 'vetCenterId',
        as: 'vetCenter'
    });
    VetCenter.hasMany(Appointment, {
        foreignKey: 'vetCenterId',
        as: 'vetCenterAppointments'
    });
    Appointment.belongsTo(OsteoCenter, {
        foreignKey: 'osteoCenterId',
        as: 'osteoCenter'
    });
    OsteoCenter.hasMany(Appointment, {
        foreignKey: 'osteoCenterId',
        as: 'osteoCenterAppointments'
    });
    Appointment.belongsTo(StatusAppointment, {
        foreignKey: 'statusAppointmentId',
        as: 'statusAppointment'
    });
    StatusAppointment.hasMany(Appointment, {
        foreignKey: 'statusAppointmentId',
        as: 'statusAppointments'
    });
    Appointment.belongsTo(ReasonAppointment, {
        foreignKey: 'reasonAppointmentId',
        as: 'reasonAppointment'
    });
    ReasonAppointment.hasMany(Appointment, {
        foreignKey: 'reasonAppointmentId',
        as: 'reasonAppointments'
    });

    //ASSOCIATION WorkSchedule
    WorkSchedule.belongsTo(Task, {
        foreignKey: 'taskId',
        as: 'task'
    });
    Task.hasMany(WorkSchedule, {
        foreignKey: 'taskId',
        as: 'workSchedules'
    });
    WorkSchedule.belongsTo(Patient, {
        foreignKey: 'patientId',
        as: 'patient'
    });
    Patient.hasMany(WorkSchedule, {
        foreignKey: 'patientId',
        as: 'workSchedules'
    });
};

module.exports = setupAssociations;
