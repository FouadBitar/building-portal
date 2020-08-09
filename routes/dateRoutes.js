const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/isAuthenticated');

const Reservation = mongoose.model('reservations');
const ReservationDate = mongoose.model('reservationDates');

module.exports = app => {
    
    app.get('/api/dates', requireLogin, async (req, res) => {
        const dates = await ReservationDate.find({});

        res.send(dates);
    });

    /**
     * This method creates a reservation. If there is an existing DateReservation entry with the
     * matching date selected in the database, then append the new reservation to that date. 
     * If there is no existing DateReservation with the matching date selected, then create the DateReservation
     * with the new Reservation.
     */
    app.post('/api/reservations', requireLogin, async (req, res) => {
        const { current_date, checked, current_date_match, available_slots } = req.body;

        const slots = _.reduce(checked, (result, value, index) => {
            if(value === 1) result.push(available_slots[index].time);
            return result;
        }, []);
        
        if(current_date_match) {
            const reservation = new Reservation({
                slots: slots,
                _user: req.user.id
            });
    
            const reservationDate = await ReservationDate.updateOne({
                _id: current_date_match._id
            }, {
                $push: { reservations: reservation }
            });

        } else {
            const reservation = new Reservation({
                slots: slots,
                _user: req.user.id
            });

            const reservationDate = new ReservationDate({
                date: new Date(current_date),
                reservations: [reservation]
            });

            await reservationDate.save();
        }

        res.send('all good boss');
    });
}