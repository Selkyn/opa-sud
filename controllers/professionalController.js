const Patient = require("../models/Patient")
const Sex = require("../models/Sex")
const Vet = require("../models/Vet")
const VetCenter = require("../models/VetCenter")
const axios = require('axios');

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
                    as: "vets"
                }
            ]
        });

        res.status(200).json(vetCenter);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du centre vétérinaire :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des détails du centre vétérnaire"});
    }
}

exports.createProfessionalForm = async (req, res) => {
    try {
        const sexes = await Sex.findAll();

        res.status(200).json(sexes);
    } catch (error) {
        console.error("Erreur lors de la récupération des sexes");
    }
}

exports.addProfessional = async (req, res) => {
    const apiKey = process.env.OPENCAGEDATA_API_KEY;
    try {
        const {
            name,
            email,
            adress,
            city,
            postal,
            department,
            phone,
            infos,
            vetSexId,
            vetFirstname,
            vetLastname
        } = req.body;

        const fullAddress =`${adress}, ${postal} ${city}`;

        const vetGeocodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`
        );
        const { lat, lng } = vetGeocodeResponse.data.results[0].geometry;

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
        })

        res.status(200).json({ message: 'Patient créé avec succès'});
    }catch (error) {
        console.error("Erreur lors de la création du centre vétérinaire :", error)
        res.status(500).json({ error: "Erreur lors de la création du centre vétérinaire"});
    }
}