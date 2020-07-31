const Post = require('../models/post');
const User = require('../models/user');
const { renderPage } = require('../utils/render-page');
const sendMail = require('../utils/send-mail');

module.exports = {
  dashboard: async (req, res) => {
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

  },

  approvePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const approvedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $set: {
            status: 'true',
          }
        }
      );
      const postCreator = await User.findById(approvedPost.creator);

      if (!approvedPost) {
        res.flash('error', 'An error occured while approving post');
      }

      if (approvedPost.status === 'true') {
        res.flash('error', 'Post has already been approved');
      }
      if (!postCreator) {
        res.flash('error', 'Creator not found');
      }
      const message = `Your post with the title: <b>${approvedPost.title}</b> has been published live.`;
          sendEmail({
            email: postCreator.email,
            subject: 'Post Approval',
            message,
          });
      res.flash('Post Approved sucessfully');
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }

  },

  disApprovePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const approvedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $set: {
            status: 'false',
          }
        }
      );

      if (!approvedPost) {
        res.flash('error', 'An error occured while approving post');
      }

      if (approvedPost.status === 'false') {
        res.flash('error', 'Post has already been disapproved');
      }

      res.flash('Post Disapproved sucessfully');
    } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    }

  }
};
