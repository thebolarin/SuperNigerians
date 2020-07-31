const router = require('express').Router();
const adminRoutes = require('./admin');
const post = require('./post') ;
const user = require('./user')
const userDashboard = require('./userDashboard')

const {
  home,
} = require('../controllers/index');


router.get('/', home);
router.use('/user', user);
router.use('/post', post);
router.use('/admin', adminRoutes);
router.get('/', home);
router.use('/profile', userDashboard)

module.exports = router;