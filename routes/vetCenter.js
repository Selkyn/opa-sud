const express = require('express');
const router = express.Router();

const vetCenterCtrl = require('../controllers/vetCenter');

router.get('/', vetCenterCtrl.getVetCenters);
// router.get('/form', vetCenterCtrl.createvetCentersForm);
router.post('/add', vetCenterCtrl.addVetCenter);
router.get('/:id', vetCenterCtrl.vetCenterDetails);
router.delete('/:id/delete', vetCenterCtrl.deleteVetCenter);
router.put('/:id/edit', vetCenterCtrl.editVetCenter);
router.put('/:id/contact', vetCenterCtrl.updateVetCenterContact);


// router.get('/form', patientCtrl.createPatientForm);
// router.post('/add', patientCtrl.addPatient);


module.exports = router;