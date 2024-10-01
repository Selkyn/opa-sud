const Patient = require("../models/Patient")
const Vet = require("../models/Vet")
const VetCenter = require("../models/VetCenter")

exports.getProfessionals = async (req, res) => {
    try {
        const professionals = await VetCenter.findAll({
            include: [
                {
                    model: Patient,
                    as: 'patients'
                },
                {
                    model: Vet,
                    as: "vets"
                }
            ]
        })

        res.render('professionals', {
            professionals
        })
    } catch (error) {
        console.error("Erreur lors de la récupération des professionels :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des professionels" });
    }
}