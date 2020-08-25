const isAuthenticated = require('../middlewares/isAuthenticated');
const sendEmail = require('../services/sendEmail');


module.exports = (app)=> {

    app.post('/api/emails', isAuthenticated, async (req, res) => {
        const { subject, body, recipients } = req.body;
        const email = {
            to: recipients.split(',').map(email => email.trim()),
            subject: subject,
            text: body
        };

        sendEmail(email)

        res.send('all good');
    });

}