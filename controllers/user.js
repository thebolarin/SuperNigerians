const User = require('../models/user')
const cloud = require('cloudinary').v2;
//cloudinary Configuration
cloud.config({
  cloud_name: process.env.SUPPER_NIGERIA_CLOUD_NAME,
  api_key: process.env.SUPPER_NIGERIA_CLOUD_API,
  api_secret: process.env.SUPPER_NIGERIA_CLOUD_SECRET,
});

module.exports = {
  updateUser: async (req, res) =>{
    const { 
    firstname,
    lastname,
    location,
    phone } = req.body;
    //look for the info for all the stuff
    const userId = '5f22f30b15f0dec809af4a2a';
    const userfilter = { _id: userId }
    const updateUser = { 
      firstname,
      lastname,
      location,
      phone }
    try {
        //find user and update
        const findUserUpdate = await User.findByIdAndUpdate(userfilter,updateUser)
        if(!findUserUpdate)return res.status(401).json("unable to update user profile")
        res.status(200).json({message:"Successfully updated"})
      } catch(err) {
       // res.status(500).send(err) 
  }
},

userPhoto: async (req, res) =>{
  const userId = '5f22f30b15f0dec809af4a2a';
  const photo = await uploadPhoto(req, res,'image/png','image/jpeg',100000)
  await User.findByIdAndUpdate({_id: userId},{photo})
}

}
/**
 * @param {*} mediaType type of file to upload
 * verify the image 
 * upload the image to cloudinary
 */

const uploadPhoto = async (req, res, mediaType, sImage, size) => {
  if (!req.files) {
    return res.status(400).json({
      status:'error',
      message:'No files selected'
    })
   }
  const imageFile = req.files.photo;
  if (!(imageFile.mimetype === mediaType || imageFile.mimetype === sImage))
 return  res.status(400).json({
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
    const employerLogoUpload = await cloud.uploader.upload(imageFile.tempFilePath);
    const { url } = employerLogoUpload;
   // console.log(url)
    return url;
  
  } catch (e) {
    // return res.status(500).json({
    //   status:'error',
    //   message:'Internal server error'
    // })

  }
}