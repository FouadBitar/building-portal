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
                    const token = jwt.sign({ user: user }, 'top_secret');
                    return res.status(200).send({
                        user: user,
                        token: token,
                        message: 'successfully logged in'
                    });
                })
            }
            catch(error) {
                return next(error);
            }
        })(req, res, next);
    }, );
    

    app.get('/api/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};