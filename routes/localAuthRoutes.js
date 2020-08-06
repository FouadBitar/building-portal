const passport = require('passport');
const jwt = require('jsonwebtoken')

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
        }, { successRedirect: '/posts' })(req, res, next);
    });
    


    app.get('/api/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.clearCookie('access_token');
        res.json({ user: { username: "", role: "" }, success: true })
    })

    /* app.get('/api/logout', async (req,res) => {
        req.logout();
        res.redirect('/');
    }); */

    app.get('/api/current_user', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send(req.user);
    });

    // app.get('/api/current_user', passport.authenticate('jwt', { session: false }),
    // function(req, res) {
    //     res.send(req.user);
    // }
// );
};