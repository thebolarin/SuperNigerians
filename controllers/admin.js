const Post = require('../models/user');
const { renderPage } = require('../utils/render-page');

module.exports = {
  dashboard: async(req,res) => {
    const data = {};
    renderPage(res, 'pages/adminDashboard', data, 'Admin | Dashboard', '/admin/dashboard');
  },

  deletePost: async(req, res, next) => {
    try {
      const { postId } = req.params;

      const userPost = await Post.findById({ id: postId });
      if(!userPost){
          res.status(400).json({ status: 'error', message: 'Post does not exist'});
      }

      const deletePost = await Post.findByIdAndRemove({ id: postId })
      if(!deletePost){
          res.flash('error', 'An error occured while deleting post');
      }

      req.flash('Post deleted sucessfully');
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  },
};