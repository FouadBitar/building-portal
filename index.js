/* eslint-disable no-template-curly-in-string */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/user.model');
require('./services/passport');


require('dotenv').config();

const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());


require('./routes/auth_routes')(app);


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


//connect to database
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


//start app on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
