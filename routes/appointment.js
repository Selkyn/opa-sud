const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../controllers/appointmenController');

router.get('/', appointmentCtrl.getAppointments);
router.post('/add', appointmentCtrl.addAppointments);
router.get('/status', appointmentCtrl.getStatusAppointments);
router.get('/reasons', appointmentCtrl.getReasonAppointments);

module.exports = router;