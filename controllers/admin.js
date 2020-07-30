const User = require('../models/user');


module.exports = {
  deletePost: async(req, res) => {
    try {
      const { postId } = req.params;

      const userPost = await User.findone({ posts: postId });
      if(!userPost){
          res.status(400).json({ status: 'error', message: 'Post does not exist'});
      }

      const deletePost = await User.findOneAndDelete({ posts: postId })
      if(!deletePost){
          res.status(400).json({ status: 'error', message: 'An error occured while deleting post'});
      }

      res.status(200).json({ status: 'success', message: 'Post deleted sucessfully'});
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  updatePost: async(req, res) => {
    try {
      const { postId } = req.params;
      const userPost = await User.findone({ posts: postId });
      if(!userPost){
        res.status(400).json({ status: 'error', message: 'Post does not exist'});
      }

      const updatePost = await User.findOneAndUpdate({ posts: postId });
      if(!updatePost){
          res.status(400).json({ status: 'error', message: 'An error occured while updating post'});
      }

      res.status(200).json({ status: 'success', message: 'Post updated sucessfully'});
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};