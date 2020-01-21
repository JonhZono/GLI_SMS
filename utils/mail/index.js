const mailer = require('nodemailer');
const feeTemplate = require('./feeTemplate');
require('dotenv').config();

const getMailDataTemplate = (
  to,
  amount,
  month,
  descriptions,
  token,
  template
) => {
  console.log('line 13' + to);
  let data = null;
  switch (template) {
    case 'monthlyFee':
      data = {
        from: 'From GLI Harumi <jonhzono@gmail.com>',
        to: 'zonojonh@gmail.com',
        subject: `GLI ${month} Payment`,
        html: feeTemplate(amount, descriptions)
      };
      break;
    default:
      return data;
  }
};

const sendMail = (to, amount, month, descriptions, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getMailDataTemplate(
    to,
    amount,
    month,
    descriptions,
    token,
    type
  );

  smtpTransport.sendMail(mail, (err, res) => {
    if (err) console.log(err);
    else console.log('Email Sent');

    smtpTransport.close();
  });
};

module.exports = sendMail;
