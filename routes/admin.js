const router = require('express').Router();
const { authorizeAdmin } = require('../middleware/auth')

const {
    dashboard, 
    deletePost,
} = require('../controllers/admin');


router.get('/dashboard', authorizeAdmin, dashboard);
router.delete('/delete/:postId', authorizeAdmin, deletePost);



module.exports = router;