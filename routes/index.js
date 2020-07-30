const router = require('express').Router();
const adminRoutes = require('./admin');

const {
  home
} = require('../controllers/index');


router.get('/', home);
router.use('/admin', adminRoutes);

module.exports = router;