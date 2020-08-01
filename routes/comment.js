const express = require('express');
const router = express.Router();
const { addComment, likeCommet, dislikeComment } = require('../controllers/comment')

router.post('/:postId/comment', addComment);
// router.patch('/comment/:commentId/like', likeComment);
// router.patch('/comment/:commentId/dislike', dislikeComment);

module.exports = router;