const express = require('express');
const router = express.Router();
const {
    postView
} = require('../controllers/post');


router.get('/posts', postView);


module.exports = router;