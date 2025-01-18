const express = require('express');
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { paymentSchema } = require("../validators/paymentValidator");
const payment = require('../controllers/paymentController');

router.put('/:id/edit', 
    validate(paymentSchema),
    sanitizeMiddleware,
    payment.updatePatientPayment);

module.exports = router;