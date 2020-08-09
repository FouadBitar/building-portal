const passport = require('passport');
const passportJWT = require("passport-jwt");

const LocalStrategy = require('passport-local').Strategy;

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const mongoose = require('mongoose');

const User = mongoose.model('users');


/**
 * - Handle error for invalid user (i.e. required document fields)
 * - Could use JWT instead of passport-local
 */

passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            
            if(!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);
            if(!validate) {
                return done(null, false, { message: 'Wrong password' });
            }

            return done(null, user, { message: 'Logged in successfully' });
        }
        catch(error) {
            return done(error);
        }
    }
));

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: cookieExtractor
}, async (payload, done) => {
    User.findOne({ username: payload.user.username }, (err, user) => {
        if(err)  done(err, false);
        if(user)  done(null, user);
        else  done(null, false);
    });
}));

