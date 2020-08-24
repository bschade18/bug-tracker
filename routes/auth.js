const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const { register, login, getUser } = require('../controllers/auth');

const { validateRegister, validateLogin } = require('../validation');

router.route('/register').post(validateRegister, register);

router.route('/login').post(validateLogin, login);

router.route('/user').get(auth, getUser);

module.exports = router;
