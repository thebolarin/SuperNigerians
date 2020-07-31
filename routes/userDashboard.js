const express = require('express')
const {getUserDetails} = require('../controllers/userDashboard')

const router = express.Router();

router.get('/', getUserDetails);
module.exports = router;