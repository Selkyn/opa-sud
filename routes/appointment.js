const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../controllers/appointmenController');

router.get('/', appointmentCtrl.getAppointments);

module.exports = router;