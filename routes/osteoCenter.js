const express = require('express');
const router = express.Router();

const osteoCenterCtrl = require('../controllers/osteoCenter');

router.get('/', osteoCenterCtrl.getOsteoCenters);
router.post('/add', osteoCenterCtrl.addOsteoCenter);
router.get('/:id', osteoCenterCtrl.osteoCenterDetails);
router.delete('/:id/delete', osteoCenterCtrl.deleteOsteoCenter);
router.put('/:id/edit', osteoCenterCtrl.editOsteoCenter);
router.put('/:id/contact', osteoCenterCtrl.updateOsteoCenterContact);

module.exports = router;
