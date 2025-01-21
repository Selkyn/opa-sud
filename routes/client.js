const express = require('express');
const router = express.Router();
const { authToken } = require('../middleware/authToken');

const clientCtrl = require('../controllers/clientController');

router.use(authToken);


router.get('/email/:email', clientCtrl.getClientEmail);
router.get('/', clientCtrl.getClients);

module.exports = router;