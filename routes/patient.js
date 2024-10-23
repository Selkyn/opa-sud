const express = require('express');
const router = express.Router();

const patientCtrl = require('../controllers/patientController');

router.get('/', patientCtrl.getPatients);
router.get('/situation', patientCtrl.getSituation);
router.get('/form', patientCtrl.createPatientForm);
router.post('/add', patientCtrl.addPatient);
router.get('/:id', patientCtrl.patientDetails);
router.get('/:id/edit', patientCtrl.showEditPatientForm);
router.put('/:id/edit/add', patientCtrl.editPatient);
router.delete('/:id/delete', patientCtrl.deletePatient);
router.put('/:id/situation', patientCtrl.updatePatientSituation);


module.exports = router;