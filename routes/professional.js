const express = require('express');
const router = express.Router();

const patientCtrl = require('../controllers/professionalController');

router.get('/', patientCtrl.getProfessionals);
// router.get('/form', patientCtrl.createPatientForm);
// router.post('/add', patientCtrl.addPatient);


module.exports = router;