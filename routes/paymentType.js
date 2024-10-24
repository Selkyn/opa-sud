const express = require('express');
const router = express.Router();

const paymentTypeCtrl = require('../controllers/paymentType');

router.get('/', paymentTypeCtrl.getPaymentTypes);

module.exports = router;