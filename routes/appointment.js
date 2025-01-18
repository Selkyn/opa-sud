const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { appointmentSchema } = require("../validators/appointmentValidator");
const { deleteSchema } = require("../validators/deleteValidator");
const appointmentCtrl = require("../controllers/appointmenController");

router.get("/", appointmentCtrl.getAppointments);
router.post(
  "/add",
  validate(appointmentSchema),
  sanitizeMiddleware,
  appointmentCtrl.addAppointments
);
router.get("/status", appointmentCtrl.getStatusAppointments);
router.get("/reasons", appointmentCtrl.getReasonAppointments);
router.delete(
  "/:id/delete",
  validate(deleteSchema, 'params'),
  sanitizeMiddleware,
  appointmentCtrl.deleteAppointment
);
router.put(
  "/:id/edit",
  validate(appointmentSchema),
  sanitizeMiddleware,
  appointmentCtrl.editAppointments
);

module.exports = router;
