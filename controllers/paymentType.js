const PaymentType = require("../models/PaymentType")


exports.getPaymentTypes = async (req, res) => {
    try {
        const paymentTypes = await PaymentType.findAll();

        res.status(200).json(paymentTypes);
    } catch (error) {
        console.error("Erreur lors de la récupération des types de paiement")
    }
}