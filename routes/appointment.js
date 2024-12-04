const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../controllers/appointmenController');

router.get('/', appointmentCtrl.getAppointments);
router.post('/add', appointmentCtrl.addAppointments);
router.get('/status', appointmentCtrl.getStatusAppointments);
router.get('/reasons', appointmentCtrl.getReasonAppointments);
router.delete('/:id/delete', appointmentCtrl.deleteAppointment);
router.put('/:id/edit', appointmentCtrl.editAppointments)

module.exports = router;