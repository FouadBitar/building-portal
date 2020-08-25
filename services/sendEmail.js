const sendgrid = require('@sendgrid/mail');
const keys = require('../config/keys');
const batchEmailTemplate = require('./emailTemplates/batchEmailTemplate');
sendgrid.setApiKey(keys.sendGridKey);


module.exports = ({ subject, to, text }) => {
    const from = 'fouad@fouadbitar.com';
    const html = batchEmailTemplate(text);
    
    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: html
    }

    sendgrid.send(msg);
}