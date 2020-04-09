const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  // make a copy from the err object
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad Object id
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    // instead of doing this in catch, we do it in the error handler if it matches Cast Error
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
