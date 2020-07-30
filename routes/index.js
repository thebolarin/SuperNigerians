const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./user')

const {
  home
} = require('../controllers/index');


router.get('/', home);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes)

module.exports = router;