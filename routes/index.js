const router = require('express').Router();
const adminRoutes = require('./admin');
const post = require('./post') ;
const user = require('./user')
const userDashboard = require('./userDashboard');
const comment = require('./comment');
const {get404} = require('../controllers/error');
const {
  home, terms, contactUs
} = require('../controllers/index');


router.get('/', home);
router.use('/user', user);
router.use('/post', post);
router.use('/admin', adminRoutes);
router.use('/post', comment);
router.use('/profile', userDashboard)
router.use('/terms', terms);
router.use('/contactUs', contactUs);
router.use('*' , get404);

module.exports = router;