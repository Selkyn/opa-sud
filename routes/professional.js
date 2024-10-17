const express = require('express');
const router = express.Router();

const professionalCtrl = require('../controllers/professionalController');

router.get('/', professionalCtrl.getProfessionals);
router.get('/:id', professionalCtrl.professionalDetails);
router.post('/add', professionalCtrl.addProfessional);

// router.get('/form', patientCtrl.createPatientForm);
// router.post('/add', patientCtrl.addPatient);


module.exports = router;