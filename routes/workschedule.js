const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { workScheduleSchema } = require("../validators/workScheduleValidator");
const { deleteSchema } = require("../validators/deleteValidator");

const workScheduleCtrl = require("../controllers/workScheduleController");

router.get("/", workScheduleCtrl.getWorkSchedules);
router.get("/tasks", workScheduleCtrl.getTask);
router.post(
  "/add",
  validate(workScheduleSchema),
  sanitizeMiddleware,
  workScheduleCtrl.addWorkSchedules
);
router.delete(
  "/:id/delete",
  validate(deleteSchema, 'params'),
  sanitizeMiddleware,
  workScheduleCtrl.deleteWorkSchedule
);
router.put(
  "/:id/edit",
  validate(workScheduleSchema),
  sanitizeMiddleware,
  workScheduleCtrl.editWorkSchedule
);

module.exports = router;
