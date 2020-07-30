module.exports.errorUserLogin = (
  req,
  res,
  email,
  password,
  errorMessage,
) =>
  res.render('auth/signin', {
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

  module.exports.errorUserRegister = (req, res, oldInput, errorMessage) => {
    return res.render('auth/signup', {
      pageName: "User Registration",
      path: '/register',
      errorMessage,
      success: req.flash('success'),
      oldInput,
    })
  }

 
