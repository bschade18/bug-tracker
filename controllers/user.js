let User = require('../models/User');

// @route GET /user
// @desc get users
// @access Public
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find().sort({ name: 1 });

    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
