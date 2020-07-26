const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
});


mongoose.model('users', userSchema);