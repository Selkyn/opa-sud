const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { vetCenterSchema } = require("../validators/vetCenterValidator");
const { deleteSchema } = require("../validators/deleteValidator");

const { updateContactSchema } = require("../validators/updateContactValidator");
const { authToken } = require('../middleware/authToken');

const vetCenterCtrl = require("../controllers/vetCenter");

router.use(authToken);

router.get("/", vetCenterCtrl.getVetCenters);
// router.get('/form', vetCenterCtrl.createvetCentersForm);
router.post(
  "/add",
  validate(vetCenterSchema),
  sanitizeMiddleware,
  vetCenterCtrl.addVetCenter
);
router.get("/:id", vetCenterCtrl.vetCenterDetails);
router.delete(
  "/:id/delete",
  validate(deleteSchema, 'params'),
  sanitizeMiddleware,
  vetCenterCtrl.deleteVetCenter
);
router.put(
  "/:id/edit",
  validate(vetCenterSchema),
  sanitizeMiddleware,
  vetCenterCtrl.editVetCenter
);
router.put(
  "/:id/contact",
  validate(updateContactSchema),
  sanitizeMiddleware,
  vetCenterCtrl.updateVetCenterContact
);

// router.get('/form', patientCtrl.createPatientForm);
// router.post('/add', patientCtrl.addPatient);

module.exports = router;
