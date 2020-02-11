const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const DueFee = require('../../model/DueFee.model');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const nodemailer = require('nodemailer');
const config = require('config');
const feeTemplate = require('../../utils/mail/feeTemplate');
require('dotenv').config();

router.post(
  '/create',
  [
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
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });

      const mailOptions = {
        from: 'GLI Harumi ✔ <gli.harumi01@gmail.com>',
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

      return res.status(200).json({ fee, success: true });
    } catch (error) {
      if (error) console.log(error);
      return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

router.get('/all', auth, admin, async (req, res) => {
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

router.get('/by_id/:fee_id', auth, admin, async (req, res) => {
  try {
    let fee = await DueFee.findById(req.params.fee_id)
      .sort({ date: -1 })
      .populate({ path: 'receiver', select: 'name' });

    return res.status(200).json(fee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.put('/by_id/:fee_id', auth, admin, async (req, res) => {
  try {
    await DueFee.findByIdAndUpdate(
      {
        _id: req.params.fee_id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    const { gmailLists, amount, month, additional } = req.body;
    if (gmailLists.length > 0) {
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });

      const mailOptions = {
        from: 'GLI Harumi ✔ <gli.harumi01@gmail.com>',
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
    }
    return res.status(200).json({ msg: 'Fee Updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.delete('/remove/:fee_id', auth, admin, async (req, res) => {
  try {
    //DELETE MONTHLY FEE
    await DueFee.findByIdAndRemove({
      _id: req.params.fee_id
    });

    res.status(200).json({ msg: 'Fee Deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
