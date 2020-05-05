let User = require('../models/User');

// @route GET /user
// @desc Get all users
// @access Private
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find().sort({ name: 1 });

    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};
