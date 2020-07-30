const {userPost} = require('../controllers/post')
const exp=require('express')
const appRoute=exp.Router()
//register new user route
appRoute.post('/new', userPost);
//admin route for category

module.exports=appRoute