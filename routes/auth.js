const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const { register, login, getUser } = require('../controllers/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/user').get(auth, getUser);

module.exports = router;
