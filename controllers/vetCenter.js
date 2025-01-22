const Appointment = require("../models/Appointment");
const Contact = require("../models/Contact");
const Patient = require("../models/Patient");
const ReasonAppointment = require("../models/ReasonAppointment");
const Sex = require("../models/Sex");
const StatusAppointment = require("../models/StatusAppointment");
const Vet = require("../models/Vet")
const VetCenter = require("../models/VetCenter")
const axios = require('axios');
const Sequelize = require('sequelize');

// Fonction pour capitaliser la première lettre de chaque mot
const capitalizeFirstLetter = (str) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const apiKey = process.env.OPENCAGEDATA_API_KEY;

exports.getVetCenters = async (req, res) => {
    try {
        const vetCenters = await VetCenter.findAll({
            include: [
                {
                    model: Patient,
                    as: 'patients',
                    include: {
                        model: Sex,
                        as: "sex"
                    }
                },
                {
                    model: Vet,
                    as: "vets"
                },
                {
                    model: Contact,
                    as: 'contact'
                }
            ]
        })

        res.status(200).json(vetCenters)
    } catch (error) {
        console.error("Erreur lors de la récupération des professionels :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des professionels" });
    }
}

exports.vetCenterDetails = async (req, res) => {
    try {
        const vetCenterId = req.params.id;

        const vetCenter = await VetCenter.findByPk(vetCenterId, {
            include: [
                {
                    model: Patient,
                    as: 'patients',
                    include: {
                        model: Sex,
                        as: "sex"
                    }
                },
                {
                    model: Vet,
                    as: "vets",
                },
                {
                    model: Contact,
                    as: 'contact'
                },
                {
                    model: Appointment,
                    as: "vetCenterAppointments",
                    include: [
                        {
                            model: ReasonAppointment,
                            as: 'reasonAppointment'
                        },
                        {
                            model: StatusAppointment,
                            as: 'statusAppointment'
                        }
                    ]
                }  
                
            ]
        });

        res.status(200).json(vetCenter);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du centre vétérinaire :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du centre vétérnaire"});
    }
}

exports.addVetCenter = async (req, res) => {
    
    try {
        // Récupérer les informations du centre vétérinaire
        let {
            name,
            email,
            adress,
            city,
            postal,
            department,
            phone,
            infos,
            vets // Tableau contenant les informations des vétérinaires
        } = req.body;

        // Vérifier que 'vets' est un tableau, sinon l'initialiser à un tableau vide
        if (!Array.isArray(vets)) {
            vets = [];
        }

        // Capitaliser les premières lettres des champs nécessaires
        name = capitalizeFirstLetter(name);
        city = capitalizeFirstLetter(city);
        // department = capitalizeFirstLetter(department);

        // Construire l'adresse complète pour la géolocalisation
        const fullAddress = `${adress}, ${postal} ${city}`;

        // Utiliser l'API de géolocalisation pour obtenir latitude et longitude
        const vetGeocodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`
        );
        const { lat, lng } = vetGeocodeResponse.data.results[0].geometry;

        // Créer le centre vétérinaire dans la base de données
        const newVetCenter = await VetCenter.create({
            name,
            email,
            adress,
            city,
            postal,
            department,
            phone,
            infos,
            latitude: lat,
            longitude: lng,
            contactId : 1
        });

        // Boucler sur chaque vétérinaire dans le tableau 'vets' et les ajouter à la base de données
        for (const vet of vets) {
            // Vérification des champs de vétérinaire
            const firstname = vet.firstname ? capitalizeFirstLetter(vet.firstname) : null;
            const lastname = vet.lastname ? capitalizeFirstLetter(vet.lastname) : null;
            const email = vet.email ? vet.email : null;
            const phone = vet.phone? vet.phone : null;
            // const sexIdVet = vet.sexIdVet ? vet.sexIdVet : null;

            // Vérifier que les informations minimales du vétérinaire sont présentes
            if (firstname && lastname) {
                await Vet.create({
                    firstname,
                    lastname,
                    email,
                    phone,
                    // sexId: sexIdVet,
                    vetCenterId: newVetCenter.id
                });
            } else {
                console.error("Données vétérinaires manquantes, pas d'ajout :", vet);
            }
        }

        res.status(200).json({ message: 'Centre vétérinaire et vétérinaires créés avec succès' });
    } catch (error) {
        console.error("Erreur lors de la création du centre vétérinaire :", error);
        res.status(500).json({ error: "Erreur lors de la création du centre vétérinaire" });
    }
};

exports.deleteVetCenter = async (req, res) => {
    try {
        const vetCenterId = req.params.id;

        const vetCenter = await VetCenter.findByPk(vetCenterId);

        await vetCenter.destroy();

        res.status(200).json({ message: "Centre vétérinaire supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du centre vétérinaire :", error);
        res.status(400).json({ error });
    }
}

exports.editVetCenter = async (req, res) => {
    const { id } = req.params;
    let { name, email, adress, city, postal, department, phone, infos, vets } = req.body;

    name = capitalizeFirstLetter(name);
    city = capitalizeFirstLetter(city);
    // department = capitalizeFirstLetter(department);

    const fullAddress = `${adress}, ${postal} ${city}`;

    // Utiliser l'API de géolocalisation pour obtenir latitude et longitude
    const vetGeocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`
    );
    const { lat, lng } = vetGeocodeResponse.data.results[0].geometry;

    try {
        // Récupérer le centre vétérinaire
        const vetCenter = await VetCenter.findByPk(id);
        if (!vetCenter) {
            return res.status(404).json({ message: "Centre vétérinaire non trouvé" });
        }

        // Mettre à jour les informations du centre vétérinaire
        await vetCenter.update({
            name,
            email,
            adress,
            city,
            postal,
            department,
            latitude: lat,
            longitude: lng,
            phone,
            infos
        });

        // Mettre à jour ou ajouter les vétérinaires
        const existingVetIds = []; // Pour garder trace des vétérinaires qui existent encore

        for (const vet of vets) {

            const firstnameVet = vet.firstname ? capitalizeFirstLetter(vet.firstname) : null;
            const lastnameVet = vet.lastname ? capitalizeFirstLetter(vet.lastname) : null;
            const emailVet = vet.email ? vet.email : null;
            const phoneVet = vet.phone ? vet.phone : null;

            if (vet.id) {
                // Si le vétérinaire a un ID, il existe déjà, on le met à jour
                await Vet.update(
                    {
                        firstname: firstnameVet,
                        lastname: lastnameVet,
                        email: emailVet,
                        phone: phoneVet
                        // sexId: vet.sexIdVet
                    },
                    { where: { id: vet.id, vetCenterId: vetCenter.id } } // Mettre à jour si le vétérinaire est lié à ce centre
                );
                existingVetIds.push(vet.id); // Ajoute cet ID à la liste des vétérinaires qui existent encore
            } else {
                // Sinon, c'est un nouveau vétérinaire, on l'ajoute
                const newVet = await Vet.create({
                    firstname: firstnameVet,
                    lastname: lastnameVet,
                    email: emailVet,
                    phone: phoneVet,
                    // sexId: vet.sexIdVet,
                    vetCenterId: vetCenter.id // Associe le vétérinaire au centre vétérinaire
                });
                existingVetIds.push(newVet.id); // Ajouter l'ID du nouveau vétérinaire à la liste
            }
        }

        // Supprimer les vétérinaires qui ne sont plus dans la liste
        await Vet.destroy({
            where: {
                vetCenterId: vetCenter.id,
                id: { [Sequelize.Op.notIn]: existingVetIds } // Supprime les vétérinaires qui ne sont plus dans la liste
            }
        });

        res.status(200).json({ message: "Centre vétérinaire mis à jour !" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du centre vétérinaire :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du centre vétérinaire" });
    }
};

exports.updateVetCenterContact = async (req, res) => {
    const vetCenterId = req.params.id; 
    const { contactId } = req.body;

    try {
        const vetCenter = await VetCenter.findByPk(vetCenterId);
        if (!vetCenter) {
            return res.status(404).json({ message: 'vetCenter non trouvé.' });
        }

        // Trouve la status par son ID
        const contact = await Contact.findByPk(contactId);
        if (!contact) {
            return res.contact(400).json({ message: 'contact non trouvée.' });
        }

        // Met à jour la situation du vetCenter
        vetCenter.contactId = contactId;
        await vetCenter.save();

        res.status(200).json({ message: 'type de contact mis à jour avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du type de contact :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du type de contact.' });
    }
};