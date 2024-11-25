const express = require('express');
const router = express.Router();

const contactCtrl = require('../controllers/contactController');

router.get('/', contactCtrl.getContacts);

module.exports = router;