const express = require('express');
const router = express.Router();

const paymentTypeCtrl = require('../controllers/paymentType');
const { authToken } = require('../middleware/authToken');

router.use(authToken);

router.get('/', paymentTypeCtrl.getPaymentTypes);

module.exports = router;