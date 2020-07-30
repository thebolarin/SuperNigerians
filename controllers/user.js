const User = require('../models/user');
const { renderPage } = require('../utils/render-page')
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.createUser = async (req, res) => {
   const data = await User.create({
       firstname: 'Tobi',
       lastname: 'Light',
       email: 'jgetitdonefast@gmail.com',
       password: 'Goodlife123.',
       username: 'xemicolon',
       photo: 'hello.jpg',
       role: 'user',
       location: 'Ikeja',
       phone: '09056347603',
   })
   console.log(data)
   res.status(201).json({
       success: true,
       data: data
   })
}

exports.getUser = async(req, res) => {
    console.log(req.session._id)
    const result = await User.findOne({email: 'jgetitdonefast@gmail.com'})
    const posts = await Post.find({creator: '5f22f1d796a28131c01e3528'})
    const comments = await Comment.find({creator: '5f22f1d796a28131c01e3528'})
    const noOfLikes = []
    comments.forEach((comment) => {
        noOfLikes.push(comment.like)
    })
    const numberOfLikes = noOfLikes.reduce((a, b) => {
        return a + b
    })

    const data = {
        result,
        posts,
        comments,
        numberOfLikes
    }
    if(data.length === 0){
        return res.send('No users at the moment')
    }
    renderPage(res, 'pages/userDashboard', data, 'User Dashboard')
}

exports.createComment = async (req, res) => {
    const data = await Comment.create({
        comment: 'This is beautiful',
        like: 65,
        dislike: 3,
        creator: '5f22f1d796a28131c01e3528'
    })
    res.json(data)
}

exports.createPost = async (req, res) => {
    const data = await Post.create({
        title: 'Hello world',
        date: '10/02/2020',
        description: 'hmm',
        creator: '5f22f1d796a28131c01e3528',
        comments: '5f22f3bf7fa5b01f44b81d6d',
        post_picture: 'hmm.jpg'
    })
    console.log(data)
}