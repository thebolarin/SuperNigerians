const { validationResult } = require('express-validator');

const { renderPage } = require('./render-page');

const validateUserRequest = (req, res, email, password) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;
    const data = {
      pageName: 'User SignIn',
      success: req.flash('success'),
      errorMessage,
      oldInput: {
        email,
        password,
      },
      validationErrors: errors.array(),
    }
    renderPage(res ,'auth/employerSignUp',data,'Employer Registration','/employer/register' )
  }
};



module.exports.validateUserRequest = validateUserRequest;