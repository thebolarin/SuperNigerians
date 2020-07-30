const router = require('express').Router();
const adminRoutes = require('./admin');

const {
  home,
  profile
} = require('../controllers/index');


router.get('/', home);
router.get('/profile', profile);
router.use('/admin', adminRoutes);

module.exports = router;