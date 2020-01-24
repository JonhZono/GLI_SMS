const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const Teacher = require('../../model/Teacher.model');
const ExamScore = require('../../model/ExamScore.model');
const combine = require('../../middleware/Combine');
const nodemailer = require('nodemailer');
const config = require('config');
const examTemplate = require('../../utils/mail/examTemplate');

/**@create
 * api/exam/score/create
 * staff & admin
 */
router.post(
  '/score/create',
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
    check('speaking', 'speaking is require')
      .not()
      .isEmpty(),
    check('examName', 'examName is require')
      .not()
      .isEmpty(),
    check('ownerId', 'ownerId is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
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
        speaking,
        examName,
        ownerId,
        teacher,
        gmail
      } = req.body;
      const exam = new ExamScore({
        writing,
        reading,
        listening,
        speaking,
        examName,
        ownerId,
        teacher,
        gmail
      });

      await exam.save();
      res.status(200).json({ msg: 'Exam Score Insert Successfully' });
    } catch (error) {
      res
        .status(400)
        .json({ errors: [{ msg: 'Maximum Score of Each Subject is 25' }] });
    }
  }
);

router.get('/scores', auth, combine, async (req, res) => {
  try {
    let exam = await ExamScore.find({})
      .sort({ date: -1 })
      .populate({ path: 'ownerId', select: 'name' })
      .populate({ path: 'teacher', model: Teacher });
    return res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/score/:exam_id', auth, (req, res) => {
  ExamScore.findOne({ _id: req.params.exam_id })
    .populate({ path: 'ownerId', select: 'name' })
    .populate({ path: 'teacher', model: Teacher })
    .exec((err, exam) => {
      if (err) res.status(400).json({ msg: 'Something went wrong!' });
      res.status(200).json(exam);
    });
});

//http://localhost:8080/api/exam/score/dashboard/exams?sortBy=createdAt&orderBy=desc&limit=4&skip=5
//do research about skip
router.get('/dashboard/all', auth, combine, (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  let orderBy = req.query.orderBy ? req.query.orderBy : 'desc';
  let limit = 15;
  ExamScore.find()
    .populate({ path: 'ownerId', select: 'name' })
    .populate({ path: 'teacher', model: Teacher })
    .sort([[sortBy, orderBy]])
    .limit(limit)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err);
      }
      res.status(200).json({
        size: docs.length,
        articles: docs
      });
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
    check('speaking', 'speaking is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const exam = await ExamScore.findByIdAndUpdate(
        { _id: req.params.exam_id },
        req.body,
        {
          new: true
        }
      );
      await exam.save();
      const {
        reading,
        speaking,
        listening,
        writing,
        gmail,
        ownerId,
        examName
      } = req.body;
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });
      const mailOptions = {
        from: 'GLI Harumi - Exam Score✔ <gli.harumi01@gmail.com>',
        to: gmail,
        subject: 'GLI Harumi Exam Score ✔ ' + `${Date.now().toString()}`,
        html: examTemplate(
          reading,
          speaking,
          listening,
          writing,
          gmail,
          ownerId,
          examName
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
        .json({ msg: 'Exam Score Update Successfully', success: true });
    } catch (error) {
      console.log(error.message);
      if (error)
        res.status(400).json({
          errors: [{ msg: 'Maximum Score of Each Subject is 25...' }]
        });
    }
  }
);

router.delete('/score/:exam_id', auth, admin, async (req, res) => {
  await ExamScore.findByIdAndRemove({ _id: req.params.exam_id });
  res.status(200).json({ msg: 'Exam Score Removed' });
});

module.exports = router;
