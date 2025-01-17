const Joi = require('joi');

const personSchema = Joi.object({
        id: Joi.number().optional().allow(null), // ID optionnel, peut être null
        firstname: Joi.string().min(2).optional().allow(null, ''), // Optionnel
        lastname: Joi.string().min(2).optional().allow(null, ''),  // Optionnel
        email: Joi.string().email().optional().allow(null, ''),    // Optionnel
        phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
})

//schema pour les centres
const centerSchema = Joi.object({
    id: Joi.number().optional().allow(null, ''),
    name: Joi.string().optional().allow(null, ''),
    adress: Joi.string().optional().allow(null, ''),
    city: Joi.string().optional().allow(null, ''),
    postal: Joi.string().pattern(/^\d{5}$/).optional().allow(null, ''),
    department: Joi.string().optional().allow(null, ''),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
    email: Joi.string().email().optional().allow(null, ''),
    infos: Joi.string().optional().allow(null, ''),
    osteos: Joi.array().items(personSchema).optional().allow(null),
    vets: Joi.array().items(personSchema).optional().allow(null),
    staff: Joi.array().items(personSchema).optional().allow(null),
});

// Sous-schéma pour le client
const clientSchema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
    adress: Joi.string().optional().allow(null, ''),
    city: Joi.string().optional().allow(null, ''),
    postal: Joi.string().pattern(/^\d{5}$/).optional().allow(null, ''),
    department: Joi.string().optional().allow(null, ''),
    clientSexId: Joi.number().optional(),
});

// Sous-schéma pour un type d’animal ou une race personnalisée
const customAnimalSchema = Joi.object({
    // id: Joi.number().optional().allow(null, ''),
    customAnimalType: Joi.string().optional().allow(null, ''),
    customRace: Joi.string().optional().allow(null, ''),
    customRaceStandalone: Joi.string().optional().allow(null, ''),
});

const addPatientSchema = Joi.object({
    name: Joi.string().min(2).required(),
    birthYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    weight: Joi.number().precision(2).optional(),
    sexId: Joi.number().required(),
    animalTypeId: Joi.alternatives()
    .try(Joi.number(), Joi.string().pattern(/^\d+$/), Joi.allow(null))
    .optional(),
    raceId: Joi.alternatives()
    .try(Joi.number(), Joi.string().pattern(/^\d+$/), Joi.allow(null))
    .optional(),
    pathology: Joi.string().optional().allow(null, ''),
    limbs: Joi.array().items(Joi.number()).optional(), // Liste des IDs des membres
    customAnimalType: Joi.string().optional().allow(null, ''), // Ajouter ici
    customRace: Joi.string().optional().allow(null, ''),
    client: clientSchema, // Client validé avec le sous-schéma
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
    adress: Joi.string().optional().allow(null, ''),
    city: Joi.string().optional().allow(null, ''),
    postal: Joi.string().pattern(/^\d{5}$/).optional().allow(null, ''),
    department: Joi.string().optional().allow(null, ''),
    clientSexId: Joi.number().optional(),
    //vetcenter
    vetCenterId: Joi.number().optional().allow(null).default(null),
    nameVetCenter: Joi.string().optional().allow(null, ''),
    adressVetCenter: Joi.string().optional().allow(null, ''),
    cityVetCenter: Joi.string().optional().allow(null, ''),
    departmentVetCenter: Joi.string().optional().allow(null, ''),
    postalVetCenter: Joi.string().pattern(/^\d{5}$/).optional().allow(null, ''),
    phoneVetCenter: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
    emailVetCenter: Joi.string().email().optional().allow(null, ''),
    infosVetCenter: Joi.string().optional().allow(null, ''),

    //osteoCenter
    osteoCenterId: Joi.number().optional().allow(null).default(null),
    nameOsteoCenter: Joi.string().optional().allow(null, ''),
    adressOsteoCenter: Joi.string().optional().allow(null, ''),
    cityOsteoCenter: Joi.string().optional().allow(null, ''),
    departmentOsteoCenter: Joi.string().optional().allow(null, ''),
    postalOsteoCenter: Joi.string().pattern(/^\d{5}$/).optional().allow(null, ''),
    phoneOsteoCenter: Joi.string().pattern(/^\+?\d{7,15}$/).optional().allow(null, ''),
    emailOsteoCenter: Joi.string().email().optional().allow(null, ''),
    infosOsteoCenter: Joi.string().optional().allow(null, ''),

    customAnimal: customAnimalSchema,
    vets: Joi.array().items(personSchema).optional(),
    osteos: Joi.array().items(personSchema).optional(),
    vetCenter: centerSchema.optional(),
    osteoCenter: centerSchema.optional(),
});

module.exports = { personSchema, centerSchema, clientSchema, customAnimalSchema, addPatientSchema}
