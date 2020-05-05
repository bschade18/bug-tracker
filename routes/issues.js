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
} = require('../controllers/issues');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(auth, advancedResults(Issue), getIssues)
  .post(auth, addIssue);

router
  .route('/:id')
  .get(auth, getIssue)
  .delete(auth, deleteIssue)
  .put(auth, updateIssue);

module.exports = router;
