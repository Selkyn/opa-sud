const PaymentMode = require("../models/PaymentMode")

exports.getPaymentModes = async (req, res) => {
    try {
        const paymentModes = await PaymentMode.findAll();

        res.status(200).json(paymentModes);
    } catch(error) {
        console.error("Erreur lors de la récupération des modes de paiements");
    }
}