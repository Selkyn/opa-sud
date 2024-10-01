const AnimalType = require('../models/AnimalType');
const Patient = require('../models/Patient');
const Sex = require('../models/Sex');
const Situation = require('../models/Situation');
const Status = require('../models/Status');
const Race = require('../models/Race');
const Payment = require('../models/Payment');
const PaymentType = require('../models/PaymentType');
const PaymentMode = require('../models/PaymentMode');
const Follow = require('../models/Follow');
const Client = require('../models/Client');
const VetCenter = require('../models/VetCenter');
const Vet = require('../models/Vet');

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            include: [
                {
                    model: Sex,
                    as: 'sex',
                    attributes: ["name"]
                },
                {
                    model: Situation,
                    as: 'situation'
                },
                {
                    model: Status,
                    as: 'status'
                },
                {
                    model: AnimalType,
                    as: 'animalType',
                    include: [
                        {
                            model: Race,
                            as: 'races',
                            attributes: ["name"]
                        }
                    ]
                },
                {
                    model: Payment,
                    as: 'payment',
                    include: [
                        {
                            model: PaymentType,
                            as: 'paymentType'
                        },
                        {
                            model: PaymentMode,
                            as: 'paymentMode'
                        }
                    ]
                },
                {
                    model: Client,
                    as: 'client',
                    include: [
                        {
                            model: Sex,
                            as: 'sex',
                            attributes: ['name']
                        }
                    ]
                },
                // {
                //     model: VetCenter,
                //     as: "vetCenter",
                //     include: [
                //         {
                //             model: Vet,
                //             as: 'vet'
                //         }
                //     ]
                // } 
            ]
        })

        // res.status(200).json(patients);
        res.render('patients', {
            patients
        })
    } catch (error) {
        console.error("Erreur lors de la récupération des patients :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des patients" });
    }
};

exports.createPatientForm = async (req, res) => {
    try {
        const sexes = await Sex.findAll();
        console.log(sexes)
        const animalTypes = await AnimalType.findAll({
            include: [
                {
                    model: Race,
                    as: 'races'
                }
            ]
        });

        const vetCenters = await VetCenter.findAll({
            include: [
                        {
                            model: Vet,
                            as: 'vets',
                            include: [
                                {
                                    model: Sex,
                                    as: "sex"
                                }
                            ]
                        }
                    ]
        })

        res.render('patientForm', {
            sexes,
            animalTypes,
            vetCenters
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données pour le formulaire :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des données pour le formulaire" });
    }
}

exports.addPatient = async (req, res) => {
    try {
        const { name,
                birthday,
                sexId,
                animalTypeId, 
                raceId, 
                pathology, 
                firstname, 
                lastname, 
                email, 
                phone, 
                adress, 
                city, 
                postal, 
                department, 
                clientSexId, 
                customAnimalType,
                customRace, 
                customRaceStandalone,
                vetCenterId,
                nameVetCenter,
                adressVetCenter,
                cityVetCenter,
                departmentVetCenter,
                postalVetCenter,
                phoneVetCenter,
                emailVetCenter ,
                firstnameVet,
                lastnameVet,
                sexIdVet,
                vetCenterIdVet
            } = req.body;

        // Vérifier que le sexe existe
        const selectedSex = await Sex.findByPk(sexId);

        let selectedAnimalType;
        let selectedRace = null;

        // Si l'utilisateur a sélectionné "Autre" et a saisi un type d'animal personnalisé
        if (animalTypeId === 'other' && customAnimalType) {
            // Vérifier si le type d'animal personnalisé existe déjà
            selectedAnimalType = await AnimalType.findOne({ where: { name: customAnimalType.trim() } });
            
            // Si le type d'animal n'existe pas, le créer
            if (!selectedAnimalType) {
                selectedAnimalType = await AnimalType.create({ name: customAnimalType.trim() });
            }

            // Créer ou vérifier la race associée à ce type d'animal
            if (customRace) {
                selectedRace = await Race.findOne({ where: { name: customRace.trim(), animalTypeId: selectedAnimalType.id } });
                if (!selectedRace) {
                    selectedRace = await Race.create({ name: customRace.trim(), animalTypeId: selectedAnimalType.id });
                }
            }
        } else {
            // Sinon, récupérer le type d'animal sélectionné
            selectedAnimalType = await AnimalType.findByPk(animalTypeId);

            // Si l'utilisateur a sélectionné "Autre" pour la race, gérer la race personnalisée
            if (raceId === 'other' && customRaceStandalone) {
                selectedRace = await Race.findOne({ where: { name: customRaceStandalone.trim(), animalTypeId: selectedAnimalType.id } });
                if (!selectedRace) {
                    selectedRace = await Race.create({ name: customRaceStandalone.trim(), animalTypeId: selectedAnimalType.id });
                }
            } else if (raceId) {
                // Si une race existante a été sélectionnée, la récupérer
                selectedRace = await Race.findOne({ where: { id: raceId, animalTypeId: selectedAnimalType.id } });
            }
        }

        // Vérifier si le client existe déjà via l'email
        let client = await Client.findOne({ where: { email } });

        if (!client) {
            // Si le client n'existe pas, le créer
            client = await Client.create({
                firstname,
                lastname,
                email,
                phone,
                adress,
                city,
                postal,
                department,
                sexId: clientSexId
            });
        }

        let vetCenter;
        if (vetCenterId && vetCenterId !== 'other') {
            // Si un centre vétérinaire existant est sélectionné, le récupérer
            vetCenter = await VetCenter.findByPk(vetCenterId);
            if (!vetCenter) {
                return res.status(400).json({ error: 'Centre vétérinaire sélectionné introuvable.' });
            }
        } else if (vetCenterId === 'other') {
            // Si "Autres" est sélectionné, créer un nouveau centre vétérinaire
            if (!nameVetCenter || !emailVetCenter) {
                return res.status(400).json({ error: 'Les informations du nouveau centre vétérinaire sont incomplètes.' });
            }

            // Vérifier si le centre vétérinaire existe déjà avec cet email
            vetCenter = await VetCenter.findOne({ where: { email: emailVetCenter } });
            if (!vetCenter) {
                vetCenter = await VetCenter.create({
                    name: nameVetCenter,
                    adress: adressVetCenter,
                    city: cityVetCenter,
                    department: departmentVetCenter,
                    postal: postalVetCenter,
                    phone: phoneVetCenter,
                    email: emailVetCenter
                });
            }
        }

        // VET
        // let vet = await Vet.findOne({ where: { lastname : lastnameVet }});

        // if(!vet) {
        //     vet = await Vet.create({
        //         firstname: firstnameVet,
        //         lastname: lastnameVet,
        //         sexId: sexIdVet,
        //         vetCenterId: vetCenter.id
        //     })
        // }

        // Créer le patient
        const patient = await Patient.create({
            name,
            birthday,
            sexId: selectedSex.id,
            animalTypeId: selectedAnimalType.id,
            raceId: selectedRace ? selectedRace.id : null, 
            pathology,
            clientId: client.id,
            vetCenterId: vetCenter.id
        });


        res.status(200).json({ message: 'Patient créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création du patient et du client :', error);
        res.status(400).json({ error: 'Erreur lors de la création du patient et du client' });
    }
};

// exports.patientDetails = async (req, res) => {
//     try {

//     }
// }

