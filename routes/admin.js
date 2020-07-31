const router = require('express').Router();
const { authorizeAdmin } = require('../middleware/auth')

const {
    dashboard, 
    deletePost,
    approvePost,
    disApprovePost,
} = require('../controllers/admin');


router.get('/dashboard', authorizeAdmin, dashboard);
router.delete('/delete/:postId', authorizeAdmin, deletePost);
router.put('/posts/:postId/approve', approvePost);
router.put('/posts/:postId/disapprove', disApprovePost);


module.exports = router;