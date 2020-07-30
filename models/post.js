const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: { type: String, slug: 'title' },
        date: {
            type: Date,
            required: false
        },
        description: {
            type: String,
            required: true
        },
        post_picture: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum : ['true', 'false'], 
            default: 'false'
        },
        media: { type : Array , "default" : [] },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Comment'
            }
          ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);