const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tower: {
        type: Number,
        enum: [ 1, 2 ],
        required: false
    },
    appartmentNumber: {
        type: Number,
        min: 300,
        max: 4010,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


mongoose.model('users', userSchema);