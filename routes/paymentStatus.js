const express = require('express');
const router = express.Router();

const paymentStatusCtrl = require('../controllers/paymentStatusController');

router.get('/', paymentStatusCtrl.getPaymentStatus);

module.exports = router;