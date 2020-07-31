const router = require('express').Router();
const { authorizeAdmin } = require('../middleware/auth')

const {
    dashboard, 
    deletePost,
    getAllUsers,
    approvePost,
    disApprovePost,
} = require('../controllers/admin');


router.get('/dashboard', authorizeAdmin, dashboard);
router.get('/dashboard/users', getAllUsers);
router.delete('/delete/:postId', authorizeAdmin, deletePost);
router.put('/posts/:postId/approve', authorizeAdmin, approvePost);
router.put('/posts/:postId/disapprove', authorizeAdmin, disApprovePost);


module.exports = router;