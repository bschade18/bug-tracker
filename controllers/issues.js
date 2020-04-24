let Issue = require('../models/Issue');
const asyncHandler = require('../middleware/async');

const ErrorResponse = require('../utils/errorResponse');

// @route GET /issue
// @desc Get all issues
// @access Public
exports.getIssues = asyncHandler(async (req, res, next) => {
  // let query;

  // // Copy req.query
  // const reqQuery = { ...req.query };

  // // Fields to exclude
  // const removeFields = ['select', 'sort', 'page', 'limit'];

  // // Loop over removeFields and delete them from reqQuery
  // removeFields.forEach((param) => delete reqQuery[param]);

  // // Create query string
  // let queryStr = JSON.stringify(reqQuery);

  // // Create operators ($gt, $gte, etc)
  // queryStr = queryStr.replace(
  //   /\b(gt|gte|lt|lte|in)\b/g,
  //   (match) => `$${match}`
  // );

  // // Finding resource
  // query = Issue.find(JSON.parse(queryStr));

  // // Select Fields
  // if (req.query.select) {
  //   const fields = req.query.select.split(',').join(' ');
  //   query = query.select(fields);
  // }

  // // Sort
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort('-number');
  // }

  // // Pagination
  // // comes in as string - convert to number
  // const page = parseInt(req.query.page, 10) || 1;
  // const limit = parseInt(req.query.limit, 10) || 1000;
  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;
  // // countDocuments is mongoose method
  // const total = await Issue.countDocuments();

  // query = query.skip(startIndex).limit(limit);
  // // Executing query
  // const issues = await query;

  // // Pagination result
  // const pagination = {};
  // if (endIndex < total) {
  //   pagination.next = {
  //     page: page + 1,
  //     limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   pagination.prev = {
  //     page: page - 1,
  //     limit,
  //   };
  // }
  res.status(200).json(res.advancedResults);
});

// @route GET /issue/:id
// @desc Get single issue
// @access Public
exports.getIssue = asyncHandler(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id);

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

// @route POST issue/add
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
// @access Public
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
// @access Public
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

// res.status(400).json({
//   success: false,
// });

// wherever we want to send error, instead of passing err, we want to create a new ErrorResponse obj with a message and status code

// this is the format we want to use whenever we want to explicitly set an error
