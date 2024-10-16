const Patient = require("../models/Patient")
const Sex = require("../models/Sex")
const Vet = require("../models/Vet")
const VetCenter = require("../models/VetCenter")

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