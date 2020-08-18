const _ = require('lodash');
const mongoose = require('mongoose');
const isAuthenticated = require('../middlewares/isAuthenticated');

const Email = mongoose.model('emails');


// const msg = {
//   to: 'fouadobitar@gmail.com',
//   from: 'fouad@fouadbitar.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

module.exports = (app, sgMail)=> {

    app.post('/api/emails', isAuthenticated, async (req, res) => {
        console.log(req.body);
        const { title, subject, body } = req.body;
        const msg = {
            to: 'fouadobitar@gmail.com',
            from: 'fouad@fouadbitar.com',
            subject: subject,
            text: body
        };
        sgMail.send(msg);
        console.log('done');
        res.send('all good');
    });

}