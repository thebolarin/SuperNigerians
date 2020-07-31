const router = require('express').Router();
const { authorizeAdmin } = require('../middleware/auth')

const {
    dashboard, 
    deletePost,
    getAllUsers
} = require('../controllers/admin');


router.get('/dashboard', authorizeAdmin, dashboard);
router.get('/dashboard/users', authorizeAdmin, getAllUsers);
router.delete('/delete/:postId', authorizeAdmin, deletePost);



module.exports = router;