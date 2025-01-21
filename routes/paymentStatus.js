const express = require('express');
const router = express.Router();

const paymentStatusCtrl = require('../controllers/paymentStatusController');
const { authToken } = require('../middleware/authToken');

router.use(authToken);

router.get('/', paymentStatusCtrl.getPaymentStatus);

module.exports = router;