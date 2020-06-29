/* eslint-disable no-template-curly-in-string */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./backend/config/keys');

require('./backend/models/user.model');
require('./backend/models/exercise.model');
require('./backend/services/passport');




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

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

require('./backend/routes/auth_routes')(app);


mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./backend/routes/exercises');
const usersRouter = require('./backend/routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);




app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});