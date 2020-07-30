const User = require('../Models/user')
const Post = require('../Models/post')
const cloud = require('cloudinary').v2;

//cloudinary Configuration
cloud.config({
  cloud_name: process.env.SUPPER_NIGERIA_CLOUD_NAME,
  api_key: process.env.SUPPER_NIGERIA_CLOUD_API,
  api_secret: process.env.SUPPER_NIGERIA_CLOUD_SECRET,
});


module.exports = {
  updateUser: async (req, res, next) =>{
    const { title,body,description, userId } = req.body;
    //look for the info for all the stuff
    const userfilter = { _id: userId }
    try {
        //find user
        const findUser = await  User.findById(userfilter)
        if(!findUser) return res.send("user not found")
        //check if a particular post has been created by a user
       const  postObj= {
          slug:title,
          User:findUser
        }
        const postExist= await Post.findOne(postObj)
        if(postExist){return res.status(400).json({
          status:'error',
          message:'Post Already Exist'
        })}
        next()
      const postUrl = saveMediaReturnUrl(mediaType)

      const postCreate=await Post.create({
          title:title,
          body:body,
          description:description,
          postPicture: postUrl,
          creator:findUser
        })

      const postResponse=await postCreate.save()
      findUser.posts.push(postResponse)
      const updatePost= await findUser.save()
  
      if(!updatePost)res.status(400).send({status:'error',
     message:'Failed to post'})
      res.status(200).send({
        status: "success",
        message:"Post successfully saved"})
      } catch(err) {
        res.status(500).send(err)
      }
  },
}

/**
 * @param {*} mediaType type of file to upload
 * verify the image 
 * upload the image to cloudinary
 */

function saveMediaReturnUrl(mediaType, sImage, size) {
  return async (req, res) => {

    if (!(imageFile.mimetype === mediaType || imageFile.mimetype === sImage))
     return res.status(400).json({
       status:'error',
       message:'Invalid file format'
     })

    if (imageFile.size > size) {
      return res.status(400).json({
        status:'error',
        message:'Upload file equivalent or lower than file size specified'
      })
    }
    try {
      const employerLogoUpload = await cloud.uploader.upload(file.tempFilePath);
      const { url } = employerLogoUpload;
      return url;
    } catch (e) {
      return res.status(400).json({
        status:'error',
        message:'Internal server error'
      })
 
    }
  }
}