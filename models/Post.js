const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = require('./Comment');

//can add the type of rental it is, parking/locker/apartment
//add cost and date of post
const postSchema = new Schema({
    title: String,
    body: String,
    date: Date,
    cost: Number,
    comments: [CommentSchema],
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('posts', postSchema);
