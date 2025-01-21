const express = require('express');
const router = express.Router();

const paymentModeCtrl = require('../controllers/paymentModeController');
const { authToken } = require('../middleware/authToken');

router.use(authToken);

router.get('/', paymentModeCtrl.getPaymentModes);

module.exports = router;