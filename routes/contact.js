const express = require('express');
const router = express.Router();

const contactCtrl = require('../controllers/contactController');
const { authToken } = require('../middleware/authToken');

router.use(authToken);

router.get('/', contactCtrl.getContacts);

module.exports = router;