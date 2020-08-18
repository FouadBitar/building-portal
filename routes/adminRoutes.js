const mongoose = require('mongoose');
const isAuthenticated = require('../middlewares/isAuthenticated');

const User = mongoose.model('users');

// error checking:
// - username does not already exist
module.exports = app => {

    app.post('/api/admin/new/user', isAuthenticated, async(req, res) => {
        const { username, password, tower, apartment_number } = req.body;


        const newUser = new User({
            username,
            password,
            tower,
            appartmentNumber: apartment_number,
            role: 'user'
        });

        await newUser.save();
        res.send('all good boss');
    });

    app.post('/api/admin/new/admin', isAuthenticated, async(req, res) => {
        const { username, password } = req.body;


        const newUser = new User({
            username,
            password,
            role: 'admin'
        });

        await newUser.save();
        res.send('all good boss');
    });

}