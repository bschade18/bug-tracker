const router = require("express").Router();
let User = require("../models/user.model");

// @route GET /user
// @desc get users
// @access Public
router.get("/", (req, res) => {
  //mongoose command
  User.find()
    .sort({ name: 1 })
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
