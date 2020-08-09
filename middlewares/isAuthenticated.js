const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(!user) {
            return res.status(401).send({ error: 'you must log in' });
        }
        //if user is authenticated, add user to request to be handled in next part
        req.user = user;
        next();
    })(req, res, next);
};