const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'jhfs'
  },
  role: {
    type: String,
    enum : ['user', 'admin'], 
    default: 'user'
  },
  location: {
    type: String,
    default: 'Add your location'
  },
   phone: {
    type: String,
    default: '0-000000000'
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
 
});

module.exports = mongoose.model('User', userSchema);