const express = require('express');
const router = express.Router();

const clientCtrl = require('../controllers/clientController');

router.get('/email/:email', clientCtrl.getClientEmail);
router.get('/', clientCtrl.getClients);

module.exports = router;