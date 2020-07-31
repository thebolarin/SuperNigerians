const exp = require('express')

const appRoute=exp.Router()
const { updateUser } = require('../controllers/user')

 appRoute.put('/update', updateUser)

module.exports=appRoute