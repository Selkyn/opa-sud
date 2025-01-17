const PaymentStatus = require('../models/PaymentStatus');

exports.getPaymentStatus = async (req, res) => {
    try {
        const paymentStatus = await PaymentStatus.findAll();
        res.status(200).json(paymentStatus);
    } catch(error) {
        console.error("Erreur lors de la récupération des modes de paiements");
    };
};