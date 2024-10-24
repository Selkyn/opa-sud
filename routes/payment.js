const express = require('express');
const router = express.Router();

const payment = require('../controllers/paymentController');

router.put('/:id/edit', payment.updatePatientPayment);

module.exports = router;