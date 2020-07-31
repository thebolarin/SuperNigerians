const express = require('express');

const router = express.Router();

const {
    userPost
} = require('../controllers/post')
const {
    postView,
    postSingleView
} = require('../controllers/post');


router.get('/posts', postView);
router.get('/:slug', postSingleView)
router.post('/new', userPost);


module.exports = router;