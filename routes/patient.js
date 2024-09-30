const express = require('express');
const router = express.Router();

const patientCtrl = require('../controllers/patientController');

router.get('/', patientCtrl.getPatients);
router.get('/form', patientCtrl.createPatientForm);
router.post('/add', patientCtrl.addPatient);


module.exports = router;