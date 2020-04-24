const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const Issue = require('../models/Issue');
const {
  getIssues,
  getIssue,
  addIssue,
  deleteIssue,
  updateIssue,
  getClosedissues,
} = require('../controllers/issues');

const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Issue), getIssues).post(auth, addIssue);

router.route('/:id').get(getIssue).delete(deleteIssue).put(updateIssue);

router.route('/closed/recent').get(getClosedissues);

module.exports = router;
