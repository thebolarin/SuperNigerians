const {
    renderPage
} = require('../utils/render-page');
const Post = require('../models/post');


const postView = async (req, res) => {

    const posts = await Post.find({})

    renderPage(res, 'pages/posts', posts, 'Posts', '/posts');
}

module.exports = {
    postView,
}