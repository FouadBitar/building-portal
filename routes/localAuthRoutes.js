const passport = require('passport');
const jwt = require('jsonwebtoken');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = app => {

    app.post('/api/login', async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if(err || !user) {
                    const error = new Error('An error occured');
                    return next(error);
                }
                req.login(user, { session: false }, async (error) => {
                    if(error) return next(error);
                    const token = jwt.sign({ user: user }, 'top_secret', { expiresIn: "1h" });
                    res.cookie('access_token', token, {httpOnly: true, sameSite: true});
                    res.status(200).json({ isAuthenticated: true, user: { username: user.username, role: user.role } })
                })
            }
            catch(error) {
                return next(error);
            }
        })(req, res, next);
    });
    

    app.get('/api/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
        //handle user is not authenticated and tries to logout
        res.clearCookie('access_token');
        res.json({ isAuthenticated: false, user: { username: "", role: "" }, success: true })
    });


    //req.user is not persistent because we have no session storing this information, so we have to 
    //authenticate the user each time and then use the user value, so how can we pass the user value here from
    //the middleware isAuthenticated?
    app.get('/api/current_user', isAuthenticated, (req, res) => {
        res.status(200).json(req.user);
    });
};