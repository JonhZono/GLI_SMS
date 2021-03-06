const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const Teacher = require('../../model/Teacher.model');
const EikenExamScore = require('../../model/EikenExamScore.model');
const combine = require('../../middleware/Combine');
const nodemailer = require('nodemailer');
const config = require('config');
const eikenExamTemplate = require('../../utils/mail/eikenExamTemplate');

/**@create
 * api/exam/score/create
 * staff & admin
 */
router.post(
  '/score/create',
  auth,
  combine,
  [
    check('reading', 'reading is require')
      .not()
      .isEmpty(),
    check('listening', 'listening is require')
      .not()
      .isEmpty(),
    check('level', 'exam name is require')
      .not()
      .isEmpty(),
    check('ownerId', 'ownerId is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty(),
    check('name', 'name is require')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        writing,
        reading,
        listening,
        attitude,
        qna,
        level,
        ownerId,
        teacher,
        examDate,
        gmail,
        name
      } = req.body;
      const exam = new EikenExamScore({
        writing,
        reading,
        listening,
        attitude,
        qna,
        level,
        ownerId,
        examDate,
        teacher,
        gmail,
        name
      });

      await exam.save();

      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });
      const mailOptions = {
        from: 'GLI Harumi - Eiken Exam Score✔ <gli.harumi01@gmail.com>',
        to: gmail,
        subject: 'GLI Harumi Exam Score ✔ ' + `${Date.now().toString()}`,
        html: eikenExamTemplate(
          reading,
          listening,
          writing,
          attitude,
          qna,
          gmail,
          level,
          examDate,
          name
        )
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
      res
        .status(200)
        .json({ msg: 'Exam Score Insert Successfully', success: true });
    } catch (error) {
      res
        .status(400)
        .json({ errors: [{ msg: 'Maximum Score of Each Subject is 25' }] });
    }
  }
);

router.get('/scores', auth, combine, async (req, res) => {
  try {
    let exam = await EikenExamScore.find({})
      .sort({ date: -1 })
      .populate({ path: 'ownerId', select: 'name' })
      .populate({ path: 'teacher', model: Teacher });
    return res.status(200).json(exam);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/score/:exam_id', auth, (req, res) => {
  EikenExamScore.findOne({ _id: req.params.exam_id })
    .populate({ path: 'ownerId', select: 'name' })
    .populate({ path: 'teacher', model: Teacher })
    .exec((err, exam) => {
      if (err) res.status(400).json({ msg: 'Something went wrong!' });
      res.status(200).json(exam);
    });
});

router.put(
  '/score/:exam_id',
  auth,
  combine,
  [
    check('writing', 'writing is require')
      .not()
      .isEmpty(),
    check('reading', 'reading is require')
      .not()
      .isEmpty(),
    check('listening', 'listening is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty(),
    check('name', 'name is require')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const exam = await EikenExamScore.findByIdAndUpdate(
        { _id: req.params.exam_id },
        req.body,
        {
          new: true
        }
      );
      await exam.save();
      const {
        reading,
        listening,
        writing,
        attitude,
        qna,
        gmail,
        level,
        examDate,
        name
      } = req.body;
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });
      const mailOptions = {
        from: 'GLI Harumi - Eiken Exam Score✔ <gli.harumi01@gmail.com>',
        to: gmail,
        subject: 'GLI Harumi Exam Score ✔ ' + `${Date.now().toString()}`,
        html: eikenExamTemplate(
          reading,
          listening,
          writing,
          attitude,
          qna,
          gmail,
          level,
          examDate,
          name
        )
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
      res
        .status(200)
        .json({ msg: 'Eiken Exam Score Update Successfully', success: true });
    } catch (error) {
      console.log(error.message);
      if (error)
        res.status(400).json({
          errors: [{ msg: 'Please follow the standard maximum score' }]
        });
    }
  }
);

router.delete('/score/:exam_id', auth, admin, async (req, res) => {
  await EikenExamScore.findByIdAndRemove({ _id: req.params.exam_id });
  res.status(200).json({ msg: 'Exam Score Removed' });
});

module.exports = router;
