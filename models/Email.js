const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const emailSchema = new Schema({
    title: String,
    subject: String,
    body: String,
    date: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('emails', emailSchema);