// Initializes the `emails` service on path `/emails`
// const { Emails } = require('./emails.class');
const hooks = require('./emails.hooks');

const Mailer = require('feathers-mailer');
// const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {
  // Create a SMTP transporter object
  // const transporter = nodemailer.createTransport({

  // });
  // Initialize our service with any options it requires
  app.use('/emails', Mailer(smtpTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
    service: 'gmail',
    // proxy: 'http://localhost:3030',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    },
    // logger: true,
    // debug: true
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service('emails');

  service.hooks(hooks);
};
