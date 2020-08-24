const { check, body, validationResult } = require('express-validator');

exports.validateRegister = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
    .isLength({ min: 2 })
    .withMessage('Name must contain at least 2 characters'),
  check('email', 'Enter a valid email address').isEmail(),
  check('team', 'Team is required')
    .not()
    .isEmpty()
    .isLength({ min: 2 })
    .withMessage('Team must contain at least 2 characters'),
  check('password', 'Enter a password with 6 or more characters').isLength({
    min: 6,
  }),
  check('password2', 'Enter password confirmation').not().isEmpty(),
  body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    } else {
      return true;
    }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check('email', 'Please enter a valid email address').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
