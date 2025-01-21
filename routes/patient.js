const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { addPatientSchema } = require("../validators/patientValidator");
const { patientStatusSchema } = require("../validators/patientStatusValidator");
const { deleteSchema } = require("../validators/deleteValidator");
const patientCtrl = require("../controllers/patientController");
const { authToken } = require('../middleware/authToken');

// router.use(authToken);

router.get("/", patientCtrl.getPatients);
router.get("/status", patientCtrl.getStatus);
router.get("/form", patientCtrl.createPatientForm);
router.post(
  "/add",
  validate(addPatientSchema),
  sanitizeMiddleware,
  patientCtrl.addPatient
);
router.get("/:id", patientCtrl.patientDetails);
router.get(
  "/:id/edit",
  validate(addPatientSchema),
  sanitizeMiddleware,
  patientCtrl.showEditPatientForm
);
router.put("/:id/edit/add", patientCtrl.editPatient);
router.delete(
  "/:id/delete",
  validate(deleteSchema, 'params'),
  sanitizeMiddleware,
  patientCtrl.deletePatient
);
router.put(
  "/:id/status",
  validate(patientStatusSchema),
  sanitizeMiddleware,
  patientCtrl.updatePatientStatus
);

module.exports = router;
