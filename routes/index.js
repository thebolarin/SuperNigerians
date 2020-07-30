const router = require('express').Router();
const {
  home
} = require('../controllers/index');
const post = require('./post') 
router.get('/', home);
router.use('/post', post);


module.exports = router;