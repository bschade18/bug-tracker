const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
let Issue = require('../models/issue.model');
const {
  getIssues,
  getIssue,
  addIssue,
  deleteIssue,
  updateIssue,
} = require('../controllers/issues');

router.route('/').get(getIssues).post(auth, addIssue);

router.route('/:id').get(getIssue).delete(deleteIssue).put(updateIssue);

router.get('/closed/recent', (req, res) => {
  Issue.find({ status: 'Closed' })
    .sort({ updatedAt: -1 })
    .limit(5)
    .then((issues) => res.json(issues))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
