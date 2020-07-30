module.exports.errorUserLogin = (
  req,
  res,
  email,
  password,
  errorMessage,
) =>
  res.render('auth/employerSignUp', {
    pageName: 'User Login',
    path: '/login',
    errorMessage,
    success: req.flash('success'),
    oldInput: {
      email,
      password,
    },
    validationErrors: [],
  });

  const employeeSignupRedirect = (req, res, error, userData) => {
    req.flash('error', error);
    req.flash('oldInput', userData);
    return res.redirect('/employee/register');
  }

module.exports.employeeSignupRedirect = employeeSignupRedirect;
