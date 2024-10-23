const Patient = require("../models/Patient")
const Sex = require("../models/Sex")
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

exports.getProfessionals = async (req, res) => {
    try {
        const professionals = await VetCenter.findAll({
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
                }
            ]
        })

        res.status(200).json(professionals)
    } catch (error) {
        console.error("Erreur lors de la récupération des professionels :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des professionels" });
    }
}

exports.professionalDetails = async (req, res) => {
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
                }
            ]
        });

        res.status(200).json(vetCenter);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du centre vétérinaire :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du centre vétérnaire"});
    }
}


// exports.createProfessionalsForm = async (req, res) => {
//     try {
//         const sexes = await Sex.findAll();
//         console.log(sexes)
//         res.status(200).json(sexes);
        
//     } catch (error) {
//         console.error("Erreur lors de la récupération des sexes");
//         res.status(500).json({ message: "Erreur lors de la récupération des sexes" });
//     }
// }

exports.addProfessional = async (req, res) => {
    
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
        department = capitalizeFirstLetter(department);

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
            longitude: lng
        });

        // Boucler sur chaque vétérinaire dans le tableau 'vets' et les ajouter à la base de données
        for (const vet of vets) {
            // Vérification des champs de vétérinaire
            const firstnameVet = vet.firstnameVet ? capitalizeFirstLetter(vet.firstnameVet) : null;
            const lastnameVet = vet.lastnameVet ? capitalizeFirstLetter(vet.lastnameVet) : null;
            const emailVet = vet.emailVet ? vet.emailVet : null;
            // const sexIdVet = vet.sexIdVet ? vet.sexIdVet : null;

            // Vérifier que les informations minimales du vétérinaire sont présentes
            if (firstnameVet && lastnameVet && emailVet) {
                console.log("Ajout du vétérinaire :", firstnameVet, lastnameVet, emailVet);
                await Vet.create({
                    firstname: firstnameVet,
                    lastname: lastnameVet,
                    email: emailVet,
                    // sexId: sexIdVet,
                    vetCenterId: newVetCenter.id
                });
            } else {
                console.log("Données vétérinaires manquantes, pas d'ajout :", vet);
            }
        }

        res.status(200).json({ message: 'Centre vétérinaire et vétérinaires créés avec succès' });
    } catch (error) {
        console.error("Erreur lors de la création du centre vétérinaire :", error);
        res.status(500).json({ error: "Erreur lors de la création du centre vétérinaire" });
    }
};

exports.deleteProfessional = async (req, res) => {
    try {
        const professionalId = req.params.id;

        const professional = await VetCenter.findByPk(professionalId);

        await professional.destroy();

        res.status(200).json({ message: "Centre vétérinaire supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du centre vétérinaire :", error);
        res.status(400).json({ error });
    }
}

exports.editProfessional = async (req, res) => {
    const { id } = req.params;
    let { name, email, adress, city, postal, department, phone, infos, vets } = req.body;

    name = capitalizeFirstLetter(name);
    city = capitalizeFirstLetter(city);
    department = capitalizeFirstLetter(department);

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

            const firstnameVet = capitalizeFirstLetter(vet.firstnameVet);
            const lastnameVet = capitalizeFirstLetter(vet.lastnameVet);

            if (vet.id) {
                // Si le vétérinaire a un ID, il existe déjà, on le met à jour
                await Vet.update(
                    {
                        firstname: firstnameVet,
                        lastname: lastnameVet,
                        email: vet.emailVet,
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
                    email: vet.emailVet,
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