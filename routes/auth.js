const express = require('express');
const { checkLoggedIn } = require('../middleware/auth');

const {
    logout,
    getUserRegister,
    postUserRegister,
    getUserLogin,
    postUserLogin,
    getReset,
    postReset,
    getNewPassword,
    postNewPassword
} = require('../controllers/auth');
const { validateLogin, validateSignup } = require('../utils/validators/auth-validator');

const router = express.Router();

router.get('/register', checkLoggedIn, getUserRegister);
router.post('/register', checkLoggedIn, validateSignup, postUserRegister);
router.get('/login', checkLoggedIn, getUserLogin);
router.post('/login', checkLoggedIn, validateLogin, postUserLogin);

router.get('/logout', logout);

router.get('/password/reset/:token', checkLoggedIn, getNewPassword);
router.get('/recover/password', checkLoggedIn, getReset);
router.post('/recover/password', checkLoggedIn, postReset);
router.post('/reset/password', checkLoggedIn, postNewPassword);
router.get('/logout', logout);
module.exports = router;