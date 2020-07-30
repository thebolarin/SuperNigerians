const express = require('express')
const {getUser, createUser, createComment, createPost} = require('../controllers/user')
const router = express.Router();

router.get('/', createUser);
router.get('/me', getUser)
router.get('/comments', createComment)
router.get('/posts', createPost)
module.exports = router;