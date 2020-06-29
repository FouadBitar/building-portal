const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    description: String,
});

mongoose.model('exercises', exerciseSchema);