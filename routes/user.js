const router = require('express').Router();

const { getUsers } = require('../controllers/user');

router.route('/').get(getUsers);

module.exports = router;
