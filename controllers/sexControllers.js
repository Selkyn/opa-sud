const Sex = require("../models/Sex");

exports.testSexes = async (req, res) => {
    try {
        const sexes = await Sex.findAll();
        console.log(sexes);  // Log des données

        res.status(200).json(sexes);
    } catch (error) {
        console.error("Erreur lors de la récupération des sexes :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des sexes" });
    }
};