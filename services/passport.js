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

passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch(error) {
        done(error);
    }
}));
 

/* passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }); */



/* passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (user.password != password) { return done(null, false); }
            return done(null, user);
        })
    }
)); */

/* passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'secret'
},
function (jwtPayload, done) {

    //find the user in db if needed
    return User.findById(jwtPayload.id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}
)); */