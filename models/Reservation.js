const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    slots: [String],
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('reservations', reservationSchema);