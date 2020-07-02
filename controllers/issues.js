const Issue = require('../models/Issue');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /issue
// @desc Get all issues
// @access Private
exports.getIssues = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @route GET /issue/:id
// @desc View single issue
// @access Private
exports.getIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id).select('-issueDescription');

  if (!issue) {
    return next(
      new ErrorResponse(`Issue not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: issue,
  });
});

exports.updateIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!issue) {
    return next(
      new ErrorResponse(`Issue not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: issue,
  });
});

// @route POST /issue
// @desc Create an issue
// @access Private
exports.addIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.create(req.body);
  res.status(200).json({
    success: true,
    data: issue,
  });
});

// @route PUT issue/:id
// @desc Update single issue
// @access Private
exports.updateIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!issue) {
    return next(
      new ErrorResponse(`Issue not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: issue,
  });
});

// @route DELETE issue/:id
// @desc Delete single issue
// @access Private
exports.deleteIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.findByIdAndDelete(req.params.id);
  if (!issue) {
    return next(
      new ErrorResponse(`Issue not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.getClosedissues = asyncHandler(async (req, res, next) => {
  try {
    const issue = await Issue.find({ status: 'Closed' })
      .sort({
        updatedAt: -1,
      })
      .limit(5);

    res.status(200).json({ success: true, data: issue });
  } catch (err) {
    res.status(400).json({ msg: err });
  }

  next();
});
