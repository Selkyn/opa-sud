const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validateMiddleware");
const { sanitizeMiddleware } = require("../middleware/sanitizeMiddleware");
const { osteoCenterSchema } = require("../validators/osteoCenterValidator");
const osteoCenterCtrl = require("../controllers/osteoCenter");

router.get("/", osteoCenterCtrl.getOsteoCenters);
router.post(
  "/add",
  validate(osteoCenterSchema),
  sanitizeMiddleware,
  osteoCenterCtrl.addOsteoCenter
);
router.get("/:id", osteoCenterCtrl.osteoCenterDetails);
router.delete("/:id/delete", osteoCenterCtrl.deleteOsteoCenter);
router.put(
  "/:id/edit",
  validate(osteoCenterSchema),
  sanitizeMiddleware,
  osteoCenterCtrl.editOsteoCenter
);
router.put("/:id/contact", osteoCenterCtrl.updateOsteoCenterContact);

module.exports = router;
