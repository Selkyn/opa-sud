const Patient = require("../models/Patient")
const Sex = require("../models/Sex")
const Osteo = require("../models/Osteo")
const OsteoCenter = require("../models/OsteoCenter")
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

exports.getOsteoCenters = async (req, res) => {
    try {
        const osteoCenters = await OsteoCenter.findAll({
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
                    model: Osteo,
                    as: "osteos"
                }
            ]
        })

        res.status(200).json(osteoCenters)
    } catch (error) {
        console.error("Erreur lors de la récupération des professionnels :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des professionnels" });
    }
}

exports.osteoCenterDetails = async (req, res) => {
    try {
        const osteoCenterId = req.params.id;

        const osteoCenter = await OsteoCenter.findByPk(osteoCenterId, {
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
                    model: Osteo,
                    as: "osteos",
                }
            ]
        });

        res.status(200).json(osteoCenter);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du centre d'ostéopathie :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du centre d'ostéopathie"});
    }
}

exports.addOsteoCenter = async (req, res) => {
    try {
        // Récupérer les informations du centre d'ostéopathie
        let {
            name,
            email,
            adress,
            city,
            postal,
            department,
            phone,
            infos,
            osteos // Tableau contenant les informations des ostéopathes
        } = req.body;

        // Vérifier que 'osteos' est un tableau, sinon l'initialiser à un tableau vide
        if (!Array.isArray(osteos)) {
            osteos = [];
        }

        // Capitaliser les premières lettres des champs nécessaires
        name = capitalizeFirstLetter(name);
        city = capitalizeFirstLetter(city);
        department = capitalizeFirstLetter(department);

        // Construire l'adresse complète pour la géolocalisation
        const fullAddress = `${adress}, ${postal} ${city}`;

        // Utiliser l'API de géolocalisation pour obtenir latitude et longitude
        const osteoGeocodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`
        );
        const { lat, lng } = osteoGeocodeResponse.data.results[0].geometry;

        // Créer le centre d'ostéopathie dans la base de données
        const newOsteoCenter = await OsteoCenter.create({
            name,
            email,
            adress,
            city,
            postal,
            department,
            phone,
            infos,
            latitude: lat,
            longitude: lng
        });

        // Boucler sur chaque ostéopathe dans le tableau 'osteos' et les ajouter à la base de données
        for (const osteo of osteos) {
            // Vérification des champs de l'ostéopathe
            const firstname = osteo.firstname ? capitalizeFirstLetter(osteo.firstname) : null;
            const lastname = osteo.lastname ? capitalizeFirstLetter(osteo.lastname) : null;
            const email = osteo.email ? osteo.email : null;

            // Vérifier que les informations minimales de l'ostéopathe sont présentes
            if (firstname && lastname) {
                console.log("Ajout de l'ostéopathe :", firstname, lastname, email);
                await Osteo.create({
                    firstname,
                    lastname,
                    email,
                    osteoCenterId: newOsteoCenter.id
                });
            } else {
                console.log("Données de l'ostéopathe manquantes, pas d'ajout :", osteo);
            }
        }

        res.status(200).json({ message: 'Centre d\'ostéopathie et ostéopathes créés avec succès' });
    } catch (error) {
        console.error("Erreur lors de la création du centre d'ostéopathie :", error);
        res.status(500).json({ error: "Erreur lors de la création du centre d'ostéopathie" });
    }
};

exports.deleteOsteoCenter = async (req, res) => {
    try {
        const osteoCenterId = req.params.id;

        const osteoCenter = await OsteoCenter.findByPk(osteoCenterId);

        await osteoCenter.destroy();

        res.status(200).json({ message: "Centre d'ostéopathie supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du centre d'ostéopathie :", error);
        res.status(400).json({ error });
    }
}

exports.editOsteoCenter = async (req, res) => {
    const { id } = req.params;
    let { name, email, adress, city, postal, department, phone, infos, osteos } = req.body;

    name = capitalizeFirstLetter(name);
    city = capitalizeFirstLetter(city);
    department = capitalizeFirstLetter(department);

    const fullAddress = `${adress}, ${postal} ${city}`;

    // Utiliser l'API de géolocalisation pour obtenir latitude et longitude
    const osteoGeocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`
    );
    const { lat, lng } = osteoGeocodeResponse.data.results[0].geometry;

    try {
        // Récupérer le centre d'ostéopathie
        const osteoCenter = await OsteoCenter.findByPk(id);
        if (!osteoCenter) {
            return res.status(404).json({ message: "Centre d'ostéopathie non trouvé" });
        }

        // Mettre à jour les informations du centre d'ostéopathie
        await osteoCenter.update({
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

        // Mettre à jour ou ajouter les ostéopathes
        const existingOsteoIds = []; // Pour garder trace des ostéopathes qui existent encore

        for (const osteo of osteos) {

            const firstnameOsteo = capitalizeFirstLetter(osteo.firstname);
            const lastnameOsteo = capitalizeFirstLetter(osteo.lastname);

            if (osteo.id) {
                // Si l'ostéopathe a un ID, il existe déjà, on le met à jour
                await Osteo.update(
                    {
                        firstname: firstnameOsteo,
                        lastname: lastnameOsteo,
                        email: osteo.email,
                    },
                    { where: { id: osteo.id, osteoCenterId: osteoCenter.id } } // Mettre à jour si l'ostéopathe est lié à ce centre
                );
                existingOsteoIds.push(osteo.id); // Ajoute cet ID à la liste des ostéopathes qui existent encore
            } else {
                // Sinon, c'est un nouvel ostéopathe, on l'ajoute
                const newOsteo = await Osteo.create({
                    firstname: firstnameOsteo,
                    lastname: lastnameOsteo,
                    email: osteo.email,
                    osteoCenterId: osteoCenter.id // Associe l'ostéopathe au centre d'ostéopathie
                });
                existingOsteoIds.push(newOsteo.id); // Ajouter l'ID du nouvel ostéopathe à la liste
            }
        }

        // Supprimer les ostéopathes qui ne sont plus dans la liste
        await Osteo.destroy({
            where: {
                osteoCenterId: osteoCenter.id,
                id: { [Sequelize.Op.notIn]: existingOsteoIds } // Supprime les ostéopathes qui ne sont plus dans la liste
            }
        });

        res.status(200).json({ message: "Centre d'ostéopathie mis à jour !" });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du centre d'ostéopathie :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du centre d'ostéopathie" });
    }
};
