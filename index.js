/* eslint-disable no-template-curly-in-string */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //.set('debug', true)
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

require('./models/User');
require('./models/Post');
require('./models/ReservationDate');
require('./services/passport');



require('dotenv').config();

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
/* app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
); */

app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());
app.use(cookieParser());


require('./routes/localAuthRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/dateRoutes')(app);
require('./routes/testingRoutes')(app);



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

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'fouadobitar@gmail.com',
//   from: 'fouad@fouadbitar.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);



//start app on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
