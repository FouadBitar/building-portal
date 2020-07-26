const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    date: Date,
    body: String
});

mongoose.model('comments', commentSchema);