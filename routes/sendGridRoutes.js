const _ = require('lodash');
const mongoose = require('mongoose');
const isAuthenticated = require('../middlewares/isAuthenticated');

const Email = mongoose.model('emails');


module.exports = app => {

    app.post('/api/emails', isAuthenticated, async (req, res) => {
        
    })


/*     app.get('/api/posts', isAuthenticated, async (req, res) => {
        const posts = await Post.find({});

        res.send(posts);
    }); */

}