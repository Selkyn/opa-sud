const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { osteoCenterSchema } = require("../validators/osteoCenterValidator");
const { updateContactSchema } = require("../validators/updateContactValidator");
const { deleteSchema } = require("../validators/deleteValidator");
const osteoCenterCtrl = require("../controllers/osteoCenter");

router.get("/", osteoCenterCtrl.getOsteoCenters);
router.post(
  "/add",
  validate(osteoCenterSchema),
  sanitizeMiddleware,
  osteoCenterCtrl.addOsteoCenter
);
router.get("/:id", osteoCenterCtrl.osteoCenterDetails);
router.delete(
  "/:id/delete",
  validate(deleteSchema, 'params'),
  sanitizeMiddleware,
  osteoCenterCtrl.deleteOsteoCenter
);
router.put(
  "/:id/edit",
  validate(osteoCenterSchema),
  sanitizeMiddleware,
  osteoCenterCtrl.editOsteoCenter
);
router.put(
  "/:id/contact",
  validate(updateContactSchema),
  sanitizeMiddleware,
  osteoCenterCtrl.updateOsteoCenterContact
);

module.exports = router;
