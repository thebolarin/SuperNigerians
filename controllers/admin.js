const User = require('../models/user');
const { renderPage } = require('../utils/render-page');

module.exports = {
  dashboard: async (req, res) => {
    const data = {};
    renderPage(res, 'pages/adminDashboard', data, 'Admin | Dashboard', '/admin/dashboard');
  },

  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;

      const userPost = await User.findone({ posts: postId });
      if (!userPost) {
        res.status(400).json({ status: 'error', message: 'Post does not exist' });
      }

      const deletePost = await User.findOneAndDelete({ posts: postId })
      if (!deletePost) {
        res.status(400).json({ status: 'error', message: 'An error occured while deleting post' });
      }

      res.status(200).json({ status: 'success', message: 'Post deleted sucessfully' });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const userPost = await User.findone({ posts: postId });
      if (!userPost) {
        res.status(400).json({ status: 'error', message: 'Post does not exist' });
      }

      const updatePost = await User.findOneAndUpdate({ posts: postId });
      if (!updatePost) {
        res.status(400).json({ status: 'error', message: 'An error occured while updating post' });
      }

      res.status(200).json({ status: 'success', message: 'Post updated sucessfully' });
    } catch (error) {
      return res.status(500).send(error);
    }
  },


  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users) return req.flash('error', 'No User found !');

      const data = {
        users
      };

      renderPage(res, 'admin/allUsers', data, 'All Users', '/');
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }
  },

  deleteUser: (req, res) => {

  }
};
