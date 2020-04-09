const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/verifyToken');

let User = require('../models/user.model');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  // check if user in db
  User.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt & hash
    const secret = process.env.SECRET;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  // check if user in db
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // check pw
    const secret = process.env.SECRET;
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      // create and assign token
      jwt.sign({ id: user._id }, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  });
});

// @route GET auth/user
// @desc get user data
// @access Private

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
