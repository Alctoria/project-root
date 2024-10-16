const express = require('express');
const router = express.Router();
const { getLeaderboard, updatePoints } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/leaderboard', getLeaderboard);
router.put('/points', auth, updatePoints);

module.exports = router;