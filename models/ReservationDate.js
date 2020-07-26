const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReservationSchema = require('./Reservation');

const reservationDateSchema = new Schema({
    date: Date,
    reservations: [ReservationSchema]
});

mongoose.model('reservationDates', reservationDateSchema);