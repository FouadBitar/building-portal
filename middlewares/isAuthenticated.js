const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(!user) {
            return res.send({ isAuthenticated: false, user: { username: "", role: "" }, message: info.message });
        }
        //if user is authenticated, add user to request to be handled in next part
        req.user = user;
        next();
    })(req, res, next);
};