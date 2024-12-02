const express = require('express');
const router = express.Router();

const workScheduleCtrl = require('../controllers/workScheduleController');

router.get('/', workScheduleCtrl.getWorkSchedules);
router.get('/tasks', workScheduleCtrl.getTask);
router.post('/add', workScheduleCtrl.addWorkSchedules);
router.delete('/:id/delete', workScheduleCtrl.deleteWorkSchedule);

module.exports = router;