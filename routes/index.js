const router = require('express').Router();
const adminRoutes = require('./admin');
const post = require('./post') ;
const user = require('./user') 

const {
  home
} = require('../controllers/index');


router.use('/user', user);
router.use('/post', post);
router.use('/admin', adminRoutes);
router.get('/', home);

module.exports = router;