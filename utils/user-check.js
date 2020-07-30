const User = require('../models/user');

exports.userCheck = (email) => {
    return User.findOne({ email });
}

exports.userCreate = (userSave) => {
  return User.create(userSave);
  
}

exports.userUpdate =  (userEmail) => {
    return User.update(
        { status: '1' },
        { where: { email:userEmail,}},
         
      );
}