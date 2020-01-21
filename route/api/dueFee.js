const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const DueFee = require('../../model/DueFee.model');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const combine = require('../../middleware/Combine');
const nodemailer = require('nodemailer');
const feeTemplate = require('../../utils/mail/feeTemplate');
require('dotenv').config();

router.post(
  '/create',
  [
    check('gmailLists', 'receiver is require')
      .not()
      .isEmpty(),
    check('amount', 'amount is require')
      .not()
      .isEmpty(),
    check('month', 'month is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { gmailLists, amount, month, additional } = req.body;
      const fee = new DueFee({
        additional,
        gmailLists,
        amount,
        month
      });
      await fee.save();
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: 'GLI Harumi ✔ <jonhzono@gmail.com>',
        to: gmailLists, // list of receivers
        subject: 'Monthly Fee ✔', // Subject line
        html: feeTemplate(month, amount, additional) // html body
      };

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent');
        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
      });
      //send email logic here
      //convert string from textarea field into array ?

      return res.status(200).json(fee);
    } catch (error) {
      if (error) console.log(error);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

router.get('/all', auth, combine, async (req, res) => {
  try {
    let fee = await DueFee.find({})
      .sort({ date: -1 })
      .populate({ path: 'receiver', select: 'name' });

    return res.json(fee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

module.exports = router;
