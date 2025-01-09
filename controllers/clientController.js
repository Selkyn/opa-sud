const Client = require('../models/Client');
const Patient = require('../models/Patient');
const Sex = require('../models/Sex');

const capitalizeFirstLetter = (str) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

exports.getClientEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const client = await Client.findOne({ where: { email } });
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: "Client introuvable" });
        }
    } catch (error) {
        console.error("Erreur lors de la recherche du client :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
      }
}

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll({
            include: [
                {
                    model: Sex,
                    as: 'sex'
                },
                {
                    model: Patient,
                    as: 'patients',
                    include: [
                        {
                            model: Sex,
                            as: 'sex'
                        }
                    ]
                }
            ]
        })
        res.status(200).json(clients)
    } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des clients" });
    }
}