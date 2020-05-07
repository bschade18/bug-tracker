let User = require('../models/User');
const asyncHandler = require('../middleware/async');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route GET auth/user
// @desc  Get user by token
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }

  next();
});

// @desc Register user
// @route POST /auth/register
// @access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, team, password } = req.body;
  // validate user data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    // check if user already in db
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      team,
      password,
    });

    console.log(user);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      id: user.id,
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          team: user.team,
          email: user.email,
        },
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// @desc Login user
// @route POST /auth/login
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // validate user data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  try {
    // check if user in db
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // check pw
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      id: user.id,
    };

    jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          team: user.team,
        },
      });
    });
  } catch (err) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
