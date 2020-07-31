const router = require('express').Router();
const {
    dashboard, 
    deletePost,
} = require('../controllers/admin');


router.get('/dashboard', dashboard);
router.delete('/delete/:postId', deletePost);



module.exports = router;