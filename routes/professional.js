const express = require('express');
const router = express.Router();

const professionalCtrl = require('../controllers/professionalController');

router.get('/', professionalCtrl.getProfessionals);
// router.get('/form', professionalCtrl.createProfessionalsForm);
router.post('/add', professionalCtrl.addProfessional);
router.get('/:id', professionalCtrl.professionalDetails);
router.delete('/:id/delete', professionalCtrl.deleteProfessional);
router.put('/:id/edit', professionalCtrl.editProfessional);


// router.get('/form', patientCtrl.createPatientForm);
// router.post('/add', patientCtrl.addPatient);


module.exports = router;