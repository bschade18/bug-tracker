const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');

const { getUsers } = require('../controllers/user');

router.route('/').get(auth, getUsers);

module.exports = router;
