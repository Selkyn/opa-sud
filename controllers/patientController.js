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
const axios = require('axios');
const Limb = require('../models/Limb');

// Fonction pour capitaliser la première lettre de chaque mot
const capitalizeFirstLetter = (str) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const apiKey = process.env.OPENCAGEDATA_API_KEY;

const makeCoord = async (adress, postal, city) => {
    const fullAddress = `${adress}, ${postal} ${city}`;

    try {
        // Appel à l'API OpenCageData pour obtenir les coordonnées
        const geocodeResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`);
        
        const { lat, lng } = geocodeResponse.data.results[0].geometry;

        return { lat, lng };
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées :', error);
        throw new Error('Impossible de récupérer les coordonnées');
    }
};

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
        

        res.status(200).json(patients);
        // res.render('patients', {
        //     patients
        // })
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

        const limbs = await Limb.findAll();

        res.status(200).json({
            sexes,
            animalTypes,
            vetCenters,
            limbs
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données pour le formulaire :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des données pour le formulaire" });
    }
}

exports.addPatient = async (req, res) => {
    
    let {
        name,
        birthYear,
        weight,
        sexId,
        animalTypeId,
        raceId,
        pathology,
        limbs,
        firstname,
        lastname,
        email,
        phone,
        adress,
        city,
        postal,
        department,
        clientSexId,
        customAnimalType, // Custom type d'animal
        customRace, // Custom race associé à customAnimalType
        customRaceStandalone, // Custom race pour un type d'animal existant
        vetCenterId,
        nameVetCenter,
        adressVetCenter,
        cityVetCenter,
        departmentVetCenter,
        postalVetCenter,
        phoneVetCenter,
        emailVetCenter
    } = req.body;


        // Capitalisation des valeurs
        name = capitalizeFirstLetter(name);
        firstname = capitalizeFirstLetter(firstname);
        lastname = capitalizeFirstLetter(lastname);
        city = capitalizeFirstLetter(city);
        department = capitalizeFirstLetter(department);
        
        if (customRace) {
            customRace = capitalizeFirstLetter(customRace);
        }
        
        if (customRaceStandalone) {
            customRaceStandalone = capitalizeFirstLetter(customRaceStandalone);
        }

        if (customAnimalType) {
            customAnimalType = capitalizeFirstLetter(customAnimalType);
        }
    
        if (nameVetCenter) {
            nameVetCenter = capitalizeFirstLetter(nameVetCenter);
        }

        if (cityVetCenter) {
            cityVetCenter = capitalizeFirstLetter(cityVetCenter);
        }

        if (departmentVetCenter) {
            departmentVetCenter = capitalizeFirstLetter(departmentVetCenter);
        }

    const fullAddress =`${adress}, ${postal} ${city}`;
    const vetFullAddress =`${adressVetCenter}, ${postalVetCenter} ${cityVetCenter}`;
    
    try {

        // console.log("Données reçues :", req.body);

        // Vérifier que le sexe existe
        const selectedSex = await Sex.findByPk(sexId);
        if (!selectedSex) {
            return res.status(400).json({ error: 'Sexe non trouvé' });
        }
        console.log("Sexe sélectionné :", selectedSex);

        let selectedAnimalType = null;
        let selectedRace = null;

        // Si l'utilisateur a sélectionné "Autre" (ou un champ vide) pour le type d'animal
        if (!animalTypeId && customAnimalType) {
            console.log("Création d'un type d'animal personnalisé:", customAnimalType);

            // Vérifier si le type d'animal personnalisé existe déjà
            selectedAnimalType = await AnimalType.findOne({ where: { name: customAnimalType.trim() } });

            // Si le type d'animal n'existe pas, le créer
            if (!selectedAnimalType) {
                console.log("Le type d'animal n'existe pas, création...");
                selectedAnimalType = await AnimalType.create({ name: customAnimalType.trim() });
            }

            // Assurez-vous que `selectedAnimalType` a bien été créé
            if (!selectedAnimalType) {
                console.error("Erreur lors de la création du type d'animal personnalisé.");
                return res.status(500).json({ error: 'Erreur lors de la création du type d\'animal personnalisé.' });
            }
            console.log("Type d'animal personnalisé créé :", selectedAnimalType);

            // Si "Autre" est aussi sélectionné pour la race, créer ou trouver la race personnalisée
            if (customRace) {
                console.log("Création d'une race personnalisée:", customRace);
                selectedRace = await Race.findOne({
                    where: { name: customRace.trim(), animalTypeId: selectedAnimalType.id }
                });
                if (!selectedRace) {
                    selectedRace = await Race.create({ name: customRace.trim(), animalTypeId: selectedAnimalType.id });
                }
                console.log("Race personnalisée créée ou trouvée :", selectedRace);
            }
        } else {
            // Si un type d'animal existant est sélectionné
            console.log("Sélection d'un type d'animal existant:", animalTypeId);
            selectedAnimalType = await AnimalType.findByPk(animalTypeId);

            if (!selectedAnimalType) {
                console.error("Type d'animal non trouvé :", animalTypeId);
                return res.status(400).json({ error: 'Type d\'animal non trouvé' });
            }

            // Si "Autre" est sélectionné pour la race et qu'il y a une race personnalisée
            if (!raceId && customRaceStandalone) {
                console.log("Création d'une race personnalisée pour un type existant:", customRaceStandalone);
                selectedRace = await Race.findOne({
                    where: { name: customRaceStandalone.trim(), animalTypeId: selectedAnimalType.id }
                });
                if (!selectedRace) {
                    selectedRace = await Race.create({
                        name: customRaceStandalone.trim(),
                        animalTypeId: selectedAnimalType.id
                    });
                }
                console.log("Race personnalisée créée ou trouvée :", selectedRace);
            } else if (raceId) {
                // Si une race existante est sélectionnée, on la récupère
                console.log("Sélection d'une race existante:", raceId);
                selectedRace = await Race.findOne({
                    where: { id: raceId, animalTypeId: selectedAnimalType.id }
                });
                if (!selectedRace) {
                    console.error("Race non trouvée pour ce type d'animal :", raceId);
                    return res.status(400).json({ error: 'Race non trouvée pour ce type d\'animal' });
                }
                console.log("Race existante trouvée :", selectedRace);
            }
        }

        

        
        

        // Gestion du client
        let client = await Client.findOne({ where: { email } });
        if (!client) {
            const { lat, lng } = await makeCoord(adress, postal, city);
            console.log("Création d'un nouveau client:", firstname, lastname);
            client = await Client.create({
                firstname,
                lastname,
                email,
                phone,
                adress,
                city,
                postal,
                department,
                latitude: lat,
                longitude: lng,
                sexId: clientSexId
            });
        }
        console.log("Client trouvé ou créé:", client);

        // Gestion du centre vétérinaire
        let vetCenter;
        if (vetCenterId && vetCenterId !== 'other') {
            console.log("Sélection d'un centre vétérinaire existant:", vetCenterId);
            vetCenter = await VetCenter.findByPk(vetCenterId);
            if (!vetCenter) {
                console.error("Centre vétérinaire non trouvé :", vetCenterId);
                return res.status(400).json({ error: 'Centre vétérinaire non trouvé.' });
            }
        } else if (vetCenterId === 'other' || !vetCenterId) {
            // Si vetCenterId est "other" ou vide, créer un centre vétérinaire personnalisé
            console.log("Création d'un centre vétérinaire personnalisé:", nameVetCenter);

            const { lat: vetLat, lng: vetLng } = await makeCoord(adress, postal, city);

            // Vérifier si le centre vétérinaire personnalisé existe déjà via email
            vetCenter = await VetCenter.findOne({ where: { email: emailVetCenter } });
            if (!vetCenter) {
                // Créer un nouveau centre vétérinaire si non trouvé
                vetCenter = await VetCenter.create({
                    name: nameVetCenter,
                    adress: adressVetCenter,
                    city: cityVetCenter,
                    department: departmentVetCenter,
                    postal: postalVetCenter,
                    phone: phoneVetCenter,
                    email: emailVetCenter,
                    latitude : vetLat,
                    longitude: vetLng
                });
            } else {
                console.log("Centre vétérinaire personnalisé existant trouvé:", vetCenter);
            }
        }
        console.log("Centre vétérinaire trouvé ou créé:", vetCenter);

        const defaultPayment = await Payment.create({
            paymentTypeId : 1,
            paymentModeId : 1
        })

        // Créer le patient
        console.log("Création du patient...");
        const patient = await Patient.create({
            name,
            birthYear,
            weight,
            sexId: selectedSex.id,
            animalTypeId: selectedAnimalType.id,
            raceId: selectedRace ? selectedRace.id : null,
            pathology,
            clientId: client.id,
            vetCenterId: vetCenter ? vetCenter.id : null,
            statusId : 1,
            paymentId : defaultPayment.id
        });
        console.log("Patient créé avec succès :", patient);

        if (limbs && limbs.length > 0) {
            const foundLimbs = await Limb.findAll({
                where: { id: limbs },
            });
            await patient.addLimbs(foundLimbs);
        }

        res.status(200).json({ message: 'Patient créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la création du patient et du client :', error);
        res.status(500).json({ error: 'Erreur lors de la création du patient et du client' });
    }
};

exports.patientDetails = async (req, res) => {
    try {
        const patientId = req.params.id;

        const patient = await Patient.findByPk(patientId, {
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
                    model: Race,
                    as: 'race'
                },
                {
                    model: Limb,
                    through: {
                        attributes: [],
                    }
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
                {
                    model: VetCenter,
                    as: "vetCenter",
                    include: [
                        {
                            model: Vet,
                            as: 'vets'
                        }
                    ]
                } 
            ]
        });

        res.status(200).json(patient);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du patient :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du patient" });
    }
}

exports.editPatient = async (req, res) => {
    try {
        const patientId = req.params.id; // Récupération de l'ID du patient
        let {
            name,
            birthYear,
            weight,
            sexId,
            animalTypeId,
            raceId,
            pathology,
            limbs,
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
            emailVetCenter
        } = req.body;

        // Capitalisation des valeurs
        name = capitalizeFirstLetter(name);
        firstname = capitalizeFirstLetter(firstname);
        lastname = capitalizeFirstLetter(lastname);
        city = capitalizeFirstLetter(city);
        department = capitalizeFirstLetter(department);

        if (customRace) customRace = capitalizeFirstLetter(customRace);
        if (customRaceStandalone) customRaceStandalone = capitalizeFirstLetter(customRaceStandalone);
        if (customAnimalType) customAnimalType = capitalizeFirstLetter(customAnimalType);
        if (nameVetCenter) nameVetCenter = capitalizeFirstLetter(nameVetCenter);
        if (cityVetCenter) cityVetCenter = capitalizeFirstLetter(cityVetCenter);
        if (departmentVetCenter) departmentVetCenter = capitalizeFirstLetter(departmentVetCenter);

        const fullAddress = `${adress}, ${postal} ${city}`;
        const vetFullAddress = `${adressVetCenter}, ${postalVetCenter} ${cityVetCenter}`;

        console.log("Données reçues pour édition :", req.body);

        // Trouver le patient existant
        const patient = await Patient.findByPk(patientId, {
            include: [Limb]
        });
        if (!patient) return res.status(404).json({ error: 'Patient non trouvé' });

        // Vérifier que le sexe existe
        const selectedSex = await Sex.findByPk(sexId);
        if (!selectedSex) return res.status(400).json({ error: 'Sexe non trouvé' });

        let selectedAnimalType = null;
        let selectedRace = null;

        if (limbs) {
            const newLimbInstances = await Limb.findAll({
                where: { id: limbs }
            });
        
            if (newLimbInstances.length !== limbs.length) {
                return res.status(400).json({ error: 'Certains limbs envoyés sont invalides.' });
            }
        
            // Remplace tous les limbs associés au patient par les nouveaux
            await patient.setLimbs(newLimbInstances);
        }

        // if(limbs) {
        //     const existingLimbs = await patient.getLimbs();

        //     const existingLimbIds = existingLimbs.map((limb) => limb.id)

        //     const newLimbs = limbs.filter((id) => !existingLimbIds.includes(id));

        //     const removedLimbs = existingLimbIds.filter((id) => !limbs.includes(id));

        //     if(newLimbs.length > 0) {
        //         const newLimbInstances = await Limb.findAll({
        //             where: { id: newLimbs},
        //         });
        //         await patient.addLimbs(newLimbInstances);
        //     }

        //     if (removedLimbs.length > 0) {
        //         const removedLimbInstances = await Limb.findAll({
        //           where: { id: removedLimbs },
        //         });
        //         await patient.removeLimbs(removedLimbInstances);
        //       }
        // }

        // Gérer le type d'animal
        if (!animalTypeId && customAnimalType) {
            selectedAnimalType = await AnimalType.findOrCreate({
                where: { name: customAnimalType.trim() }
            });

            if (customRace) {
                selectedRace = await Race.findOrCreate({
                    where: { name: customRace.trim(), animalTypeId: selectedAnimalType.id }
                });
            }
        } else {
            selectedAnimalType = await AnimalType.findByPk(animalTypeId);
            if (!selectedAnimalType) return res.status(400).json({ error: 'Type d\'animal non trouvé' });

            if (!raceId && customRaceStandalone) {
                selectedRace = await Race.findOrCreate({
                    where: { name: customRaceStandalone.trim(), animalTypeId: selectedAnimalType.id }
                });
            } else if (raceId) {
                selectedRace = await Race.findOne({
                    where: { id: raceId, animalTypeId: selectedAnimalType.id }
                });
                if (!selectedRace) return res.status(400).json({ error: 'Race non trouvée pour ce type d\'animal' });
            }
        }

        // Gérer le client existant ou à mettre à jour
        let client = await Client.findByPk(patient.clientId);
        const { lat, lng } = await makeCoord(adress, postal, city);
        if (!client) {

            client = await Client.create({
                firstname, lastname, email, phone, adress, city, postal, department,
                latitude: lat, longitude: lng, sexId: clientSexId
            });
        } else {
            await client.update({
                firstname, lastname, email, phone, adress, city, postal, department, sexId: clientSexId,
                latitude: lat, longitude: lng
            });
        }

        // Gérer le centre vétérinaire existant ou personnalisé
        let vetCenter;
        if (vetCenterId && vetCenterId !== 'other') {
            vetCenter = await VetCenter.findByPk(vetCenterId);
            if (!vetCenter) return res.status(400).json({ error: 'Centre vétérinaire non trouvé' });
        } else if (vetCenterId === 'other' || !vetCenterId) {
            vetCenter = await VetCenter.findOrCreate({
                where: { email: emailVetCenter },
                defaults: {
                    name: nameVetCenter, adress: adressVetCenter, city: cityVetCenter,
                    department: departmentVetCenter, postal: postalVetCenter,
                    phone: phoneVetCenter, email: emailVetCenter
                }
            });
        }

        await patient.update({
            name, birthYear, sexId: selectedSex.id, weight,
            animalTypeId: selectedAnimalType.id,
            raceId: selectedRace ? selectedRace.id : patient.raceId,
            pathology, clientId: client.id, vetCenterId: vetCenter ? vetCenter.id : patient.vetCenterId
        });

        console.log("Patient mis à jour avec succès :", patient);
        res.status(200).json({ message: 'Patient mis à jour avec succès' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du patient :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du patient' });
    }
};


exports.showEditPatientForm = async (req, res) => {
    try {
        const patientId = req.params.id;
        // Récupérer le patient par ID avec ses relations
        const patient = await Patient.findByPk(patientId, {
            include: [
                { model: Client, as: 'client' },
                { model: AnimalType, as: 'animalType', include: [{ model: Race, as: 'races' }] },
                { model: VetCenter, as: 'vetCenter' },
                { model: Sex, as: 'sex' }
            ]
        });

        // Récupérer les autres données nécessaires pour le formulaire
        const sexes = await Sex.findAll();
        const animalTypes = await AnimalType.findAll({
            include: [{ model: Race, as: 'races' }]
        });
        const vetCenters = await VetCenter.findAll();

        res.status(200).json({
            patient,
            sexes,
            animalTypes,
            vetCenters
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du patient pour l\'édition:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des détails du patient.' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;

        const patient = await Patient.findByPk(patientId);

        await patient.destroy();

        res.status(200).json({ message: "patient supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression du patient :", error);
      res.status(400).json({ error });
    }
}

// exports.getPayment = async (req, res) => {
//     try {
//         const payment = await Payment.findAll({
//             include:{
//                 model:
//             }
//         })
//     }
// }

exports.getStatus = async (req, res) => {
    try {
        const status = await Status.findAll();

        res.status(200).json(status)
    } catch (error) {
        console.error("Erreur lors de la récupération des status")
    }
}

exports.updatePatientStatus = async (req, res) => {
    const patientId = req.params.id; 
    const { statusId } = req.body;

    try {
        // Trouve le patient par son ID
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }
z
        // Trouve la status par son ID
        const status = await Status.findByPk(statusId);
        if (!status) {
            return res.status(400).json({ message: 'status non trouvée.' });
        }

        // Met à jour la situation du patient
        patient.statusId = statusId;
        await patient.save();

        res.status(200).json({ message: 'status mise à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la status :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la situation.' });
    }
};

