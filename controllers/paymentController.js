const Patient = require("../models/Patient");
const Payment = require("../models/Payment");
const PaymentType = require('../models/PaymentType');
const PaymentMode = require('../models/PaymentMode');

exports.updatePatientPayment = async (req, res) => {
    const patientId = req.params.id;
    const { paymentTypeId, paymentModeId, date } = req.body;
    try {
        console.log(`Requête de mise à jour du paiement pour le patient: ${patientId}`);
        console.log(`paymentTypeId: ${paymentTypeId}, paymentModeId: ${paymentModeId}, date: ${date}`);

        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            console.log(`Patient avec l'ID ${patientId} non trouvé.`);
            return res.status(404).json({ message: 'Patient non trouvé.' });
        }
        console.log(`Patient trouvé: ${patient.name}`);

        // Trouve le paiement associé au patient via paymentId
        let payment = await Payment.findByPk(patient.paymentId);

        if (!payment) {
            console.log(`Aucun paiement trouvé pour le patient avec l'ID ${patientId}, création d'un nouveau paiement.`);

            // Créer un nouveau paiement si aucun n'est trouvé
            payment = await Payment.create({
                paymentTypeId: paymentTypeId || null,
                paymentModeId: paymentModeId || null,
                date: date || new Date(),
            });

            // Associe le paiement créé au patient
            patient.paymentId = payment.id;
            await patient.save();
            console.log(`Nouveau paiement créé avec l'ID ${payment.id} et associé au patient.`);
        } else {
            console.log(`Paiement trouvé avec l'ID: ${payment.id}`);

            if (paymentTypeId !== undefined) {
                console.log(`Mise à jour du paymentTypeId: ${paymentTypeId}`);
                payment.paymentTypeId = paymentTypeId;
            }
            if (paymentModeId !== undefined) {
                console.log(`Mise à jour du paymentModeId: ${paymentModeId}`);
                payment.paymentModeId = paymentModeId;
            }
            if (date !== undefined) {
                console.log(`Mise à jour de la date du paiement: ${date}`);
                payment.date = date;
            }

            await payment.save();
            console.log('Paiement mis à jour avec succès.');
        }

        res.status(200).json({ message: 'Paiement mis à jour avec succès.', payment });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du paiement :', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du paiement.' });
    }
};

