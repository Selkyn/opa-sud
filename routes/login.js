const express = require('express');
const router = express.Router();

const loginCtrl = require('../controllers/login');

router.post('/login', loginCtrl.login);
router.post('/register', loginCtrl.signup);
router.get('/logout', loginCtrl.logout);

module.exports = router;
