const Patient = require("../models/Patient");
const Payment = require("../models/Payment");
const PaymentType = require('../models/PaymentType');
const PaymentMode = require('../models/PaymentMode');

exports.updatePatientPayment = async (req, res) => {
    const patientId = req.params.id;
    const { paymentTypeId, paymentModeId, paymentStatusId, date, endDate, amount } = req.body;
    try {
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }

        // Trouve le paiement associé au patient via paymentId
        let payment = await Payment.findByPk(patient.paymentId);

        if (!payment) {
            // Créer un nouveau paiement si aucun n'est trouvé
            payment = await Payment.create({
                paymentTypeId: paymentTypeId || null,
                paymentModeId: paymentModeId || null,
                paymentStatusId: paymentStatusId || null,
                date: date || new Date(),
                endDate: endDate || new Date(),
                amount: amount || null,
            });

            // Associe le paiement créé au patient
            patient.paymentId = payment.id;
            await patient.save();
        } else {

            if (paymentTypeId !== undefined) {
                payment.paymentTypeId = paymentTypeId;
            }
            if (paymentModeId !== undefined) {
                payment.paymentModeId = paymentModeId;
            }
            if (paymentStatusId !== undefined) {
                payment.paymentStatusId = paymentStatusId;
            }
            if (date !== undefined) {
                payment.date = date;
            }
            if (endDate !== undefined) {
                payment.endDate = endDate;
            }
            if (amount !== undefined) {
                payment.amount = amount;
            }

            await payment.save();
        }

        res.status(200).json({ message: 'Paiement mis à jour avec succès.', payment });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du paiement :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du paiement.' });
    }
};

