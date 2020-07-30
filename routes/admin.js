const router = require('express').Router();
const { 
    deletePost,
    updatePost
} = require('../controllers/admin');


router.delete('/delete/:postId', deletePost);
router.patch('update/:postId', updatePost);


module.exports = router;