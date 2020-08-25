const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(!user) {
            req.user = { isAuthenticated: false, user: { username: "", role: "" }, message: info.message };
        } else {
            req.user = { isAuthenticated: true, user: { username: user.username, role: user.role }, message: "successfully logged in" };
        }

        next();
    })(req, res, next);
};