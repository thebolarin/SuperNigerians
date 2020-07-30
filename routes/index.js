const router = require('express').Router();
const adminRoutes = require('./admin');
const userRoutes = require('./userDashboard')

const {
  home
} = require('../controllers/index');


router.get('/', home);
router.use('/admin', adminRoutes);
router.use('/user/dashboard', userRoutes)

module.exports = router;