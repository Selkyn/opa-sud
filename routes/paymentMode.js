const express = require('express');
const router = express.Router();

const paymentModeCtrl = require('../controllers/paymentModeController');

router.get('/', paymentModeCtrl.getPaymentModes);

module.exports = router;