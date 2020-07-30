const exp = require('express')

const appRoute=exp.Router()
const {userPost} = require('../controllers/post')

// register new user route
appRoute.post('/new', userPost);

module.exports=appRoute