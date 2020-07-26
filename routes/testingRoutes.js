const mongoose = require('mongoose');

const User = mongoose.model('users');
const Post = mongoose.model('posts');
const Comment = mongoose.model('comments');
const Reservation = mongoose.model('reservations');
const ReservationDate = mongoose.model('reservationDates');

module.exports = app => {

    app.get('/test/users', async (req, res) => {
        const users = await User.find({});
        res.send(users);
    });

    app.post('/test/updateusertoadmin', async (req, res) => {
        const user = await User.updateOne(
            { googleId: req.body.googleId },
            { role: 'admin' });
        
        const users = await User.find({});
        res.send(users);
    })

    app.post('/test/comments', async (req, res) => {
        const { commentText } = req.body;

        const comment = new Comment({
            date: Date.now(),
            body: commentText
        });

        const post = await Post.updateOne({
            _id: req.body.id
        }, {
            $push: { comments: comment }
        });
        
        res.send("all is good boss");
    });

    app.post('/test/posts', async (req, res) => {
        const { title, cost, body } = req.body;

        const post = new Post({
            title,
            body,
            date: Date.now(),
            comments: [],
            cost,
            _user: "5efa072029412769358cb79a"
        });

        const p = await post.save();
        res.send("all is good boss");
    });

    app.post('/test/reservations', async (req, res) => {
        const { slots } = req.body;

        const reservation = new Reservation({
            slots: slots
        });

        console.log(reservation);
        const r = await reservation.save();
        res.send("all is good boss");
    });

    app.post('/test/reservations-date', async (req, res) => {
        const { slots } = req.body;

        const reservation = new Reservation({
            slots: slots,
            _user: "5efa072029412769358cb79b"
        });

        const reservationDate = new ReservationDate({
            date: new Date(),
            reservations: [reservation]
        });

        console.log(reservationDate);
        const r = await reservationDate.save();
        res.send("all is good boss");
    });

    app.get('/test/reservations-date', async (req, res) => {
        const dates = await ReservationDate.find({});

        res.send(dates);
    });

    //erase all date reservations in the database
    app.delete('/test/dates', async(req, res) => {
        await ReservationDate.deleteMany({});
        res.send("all is good boss");
    });


    //erase all posts in the database
    app.delete('/test/posts', async(req, res) => {
        await Post.deleteMany({});
        res.send("all is good boss");
    });

    //erase a specific comment
    app.delete('/test/comments', async(req, res) => {
        console.log(req.body);
        await Post.updateOne({
            _id: req.body.postId
        }, {
            $pull: { 
                comments: { 
                    _id: req.body.commentId
                } 
            }
        });
        res.send('lets go boss');
    });

}