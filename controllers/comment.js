const Comment = require('../models/comment');
const Post = require('../models/post');

const postExist = async (postId) => {
    const post = await Post.findById({ postId });
    return post;
}

const commentExist = async (commentId) => {
    const comment = await Comment.findById({ commentId });
    return comment;
}

const createComment = async (userId, body) => {
    const comment = await Comment.create({
        coomment: body,
        dislike: 0,
        like: 0,
        creator: userId
    });
    return comment;
}

module.exports = {
    addComment: async (req, res) => {
        try{
          //find campground
            const { postId } = req.params;
            const { body } = req.body;
            const { userId } = req.session;
            const post = await postExist(postId);

            if(!post) {
                return res.status(400).json({
                    message: "Post not found"
                })
            }
            const comment = await createComment(userId, body);
            post.comment.push(comment);
            await post.save()
            
            res.status(200).json({
                message: "Comment made successfully"
            });
        } catch (err) {
            res.status(500).json({err})
        }
    },

    likeComment: async (req, res) => {
        try{
            const { commentId } = req.params;
            const comment = await commentExist(commentId);
            comment.like += 1
            await comment.save();
            return res.status(400).json({
                message: "Liked comment"
            })
        } catch (err) {
            res.stats(400).json({err})
        }
    },

    dislikeComment: async (req, res) => {
        try{
            const { commentId } = req.params;
            const comment = await commentExist(commentId);
            comment.dislike += 1
            await comment.save();
            return res.status(400).json({
                message: "Dislked comment"
            })
        } catch (err) {
            res.stats(400).json({err})
        }
    }
}