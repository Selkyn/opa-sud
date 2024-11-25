const Contact = require("../models/Contact");

exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Erreur lors de la récupération des types de contacts")
    }
}