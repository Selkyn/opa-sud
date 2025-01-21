const express = require('express');
const router = express.Router();

const sexCtrl = require('../controllers/sexControllers');
const { authToken } = require('../middleware/authToken');

router.use(authToken);

router.get('/testSexes', sexCtrl.testSexes);

module.exports = router;