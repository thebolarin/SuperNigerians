/* eslint-disable consistent-return */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
// const { message } = require('../../Utils/email-signup-template');
const { renderPage } = require('../utils/render-page');
const User = require('../models/user');
const sendEmail = require('../utils/send-email');
const asyncHandler = require('../middleware/async');
const { validateUserRequest } = require('../utils/request-body-validator');
const { userCheck } = require('../utils/user-check');
const { passwordHash } = require('../utils/password-hash');
const {
  errorUserLogin,
} = require('../utils/response');


const URL = process.env.NODE_ENV === 'development'
  ? process.env.TALENT_POOL_DEV_URL
  : process.env.TALENT_POOL_FRONT_END_URL;

const getUserLogin = (req, res) => {
  const success = req.flash('success');
  let message = req.flash('error');
  if (message.length > 0) {
    [message] = message;
  } else {
    message = null;
  }
  const data = {
    pageName: 'User Login',
    success,
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
    },
    validationErrors: [],
  };
  renderPage(res, 'auth/login', data, 'login', '/login');

};

const postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  validateUserRequest(req, res, email, password);

  await userCheck(email)
    .then(async (user) => {
      if (!user) {
        return errorUserLogin(req, res, email, password, 'Invalid email or password.',);
      }
      bcrypt.compare(password, user.password)
        .then((valid) => {
          if (valid) {
            req.session.user = user;
            req.session.createdAt = Date.now();
            req.session.isLoggedIn = true;

            return res.redirect('/');

          }
          return errorUserLogin(req, res, email, password, 'Invalid email or password.',);
        })
        .catch(() => {
          res.redirect('/login');
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};



const getReset = (req, res) => {
  const success = req.flash('success');
  let message = req.flash('error');
  if (message.length > 0) {
    [message] = message;
  } else {
    message = null;
  }
  const data = {
    pageName: 'Reset Password',
    success,
    errorMessage: message,
    oldInput: {
      email: '',
    },
    validationErrors: [],
  };
  renderPage(res, 'auth/recoverPassword', data, 'Recover Password', '/recover/password');
};

const getNewPassword = (req, res) => {
  const success = req.flash('success');
  let message = req.flash('error');
  if (message.length > 0) {
    [message] = message;
  } else {
    message = null;
  }
  const data = {
    pageName: 'Reset Password',
    success,
    token: req.params.token,
    errorMessage: message,
    oldInput: {
      password: '',
    },
    validationErrors: [],
  };
  renderPage(res, 'auth/resetPassword', data, 'Reset Password', '/reset/password');
};

const getResetPasswordToken = () => {
  // Generate token
  const token = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  const resetToken = crypto
    .createHash('sha256')
    .update(token, 'utf8')
    .digest('hex');

  // Set expire
  const resetTokenExpiration = Date.now() + 3600000;

  return {
    token,
    resetToken,
    resetTokenExpiration
  };
};

const postReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await userCheck(email);
  if (!user) {
    req.flash('error', 'User with this email is not found');
    return res.redirect('/recover/password');
  }

  // Get reset token
  const {
    token,
    resetToken,
    resetTokenExpiration,
  } = getResetPasswordToken();

  await User.update({
    resetToken,
    resetTokenExpiration,
  }, {
    where: {
      email
    },
  });

  // Create reset url
  const resetUrl = `${URL}/password/reset/${token}`;
  const message = `You are receiving this email because a password reset has been requested
  with your email. Please click this link to proceed: \n\n <a href=${resetUrl}>link</a> or
  ignore if you are unaware of this action.`;

  try {
    sendEmail({
      email,
      subject: 'TalentPool User Email verification',
      message: message(resetUrl),
    });


    req.flash('success', 'Reset password link has been sent to your mail');
    return res.redirect('/recover/password');
  } catch (err) {
    user.resetToken = null;
    user.resetTokenExpiration = null;

    req.flash('error', 'An error occured, please try again!');
    return res.redirect('/recover/password');
  }
});

// @desc      Reset password
// @route     PUT /v1/auth/resetpassword/:resettoken
// @access    Public
const postNewPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetToken = crypto
    .createHash('sha256')
    .update(req.body.token, 'utf8')
    .digest('hex');

  const user = await User.findOne({
    where: {
      resetToken,
    },
  });

  if (!user) {
    req.flash('error', 'Invalid token');
    return res.redirect('/recover/password');
  }

  if (user.resetTokenExpiration < Date.now()) {
    req.flash('error', 'Reset password token expired,please try again');
    return res.redirect('/recover/password');
  }


  // Set new password
  user.password = passwordHash(req.body.password);
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  req.flash('success', 'Password changed successfully');

  return res.redirect('/login');
});

const logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session = null;
  }
  res.redirect('/login');
};



module.exports = {
  getUserLogin,
  postUserLogin,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
  logout
}