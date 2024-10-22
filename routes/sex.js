const express = require('express');
const router = express.Router();

const sexCtrl = require('../controllers/sexControllers');

router.get('/testSexes', sexCtrl.testSexes);

module.exports = router;