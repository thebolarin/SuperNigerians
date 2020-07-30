const { body } = require('express-validator');

const validateSignup = [
  body('firstname', 'Firstname cannot be empty').notEmpty(),
  body('lastname', 'Lastname cannot be empty').notEmpty(),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage(
      'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
    )
    .matches(
      
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\\$%\\^&\\*\\?|\\+\\(\\)\\[\]\\{}\\.])(?=.{8,})/,
    )
    .withMessage(
      'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
    ),
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage(
      'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
    )
    .matches(
      
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\\$%\\^&\\*\\?|\\+\\(\\)\\[\]\\{}\\.])(?=.{8,})/,
    )
    .withMessage(
      'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
    ),
];

module.exports = {
  validateSignup,
  validateLogin,
};
