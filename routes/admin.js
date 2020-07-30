const router = require('express').Router();
const {
    dashboard, 
    deletePost,
    updatePost,
} = require('../controllers/admin');


router.get('/dashboard', dashboard);
router.delete('/delete/:postId', deletePost);
router.patch('update/:postId', updatePost);


module.exports = router;