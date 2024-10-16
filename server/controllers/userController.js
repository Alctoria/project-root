const User = require('../models/User');
const { calculateRank } = require('../utils/rankCalculator');

exports.getLeaderboard = async (req, res) => {
  const { type } = req.query;
  let startDate;

  switch (type) {
    case 'weekly':
      startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'monthly':
      startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(0);
  }

  try {
    const leaderboard = await User.find({ createdAt: { $gte: startDate } })
      .sort('-points')
      .limit(100)
      .select('name points rank');

    const totalUsers = await User.countDocuments();
    leaderboard.forEach(user => {
      user.rank = calculateRank(user.points, totalUsers).name;
    });

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePoints = async (req, res) => {
  const { points } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.points += points;
    const totalUsers = await User.countDocuments();
    user.rank = calculateRank(user.points, totalUsers).name;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};