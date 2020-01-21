const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const User = require('../../model/User.model');
const ClassFeedback = require('../../model/ClassFeedback.model');
const StudentLists = require('../../model/StudentLists.model');
const Classroom = require('../../model/Classroom.model');
const Grade = require('../../model/Grade.model');
const Teacher = require('../../model/Teacher.model');
const combine = require('../../middleware/Combine');
const nodemailer = require('nodemailer');
const feedbackTemplate = require('../../utils/mail/feedbackTemplate');
require('dotenv').config();

router.post(
  '/create',
  [
    check('lessonID', 'lessonID is require')
      .not()
      .isEmpty(),
    check('termCode', 'termCode is require')
      .not()
      .isEmpty(),
    check('classroom', 'classroom is require')
      .not()
      .isEmpty(),
    check('grade', 'grade is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty(),
    check('lessonContent', 'lessonContent is require')
      .not()
      .isEmpty(),
    check('ownerId', 'ownerId is require')
      .not()
      .isEmpty()
  ],
  auth,
  combine,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        lessonID,
        termCode,
        grade,
        classroom,
        gliNews,
        teacher,
        lessonContent,
        publish,
        ownerId,
        email
      } = req.body;
      const feedback = new ClassFeedback({
        lessonID,
        termCode,
        classroom,
        grade,
        teacher,
        gliNews,
        lessonContent,
        publish,
        ownerId,
        email
      });

      await feedback.save();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

//http://localhost:8080/api/classfeedback/classes?sortBy=createdAt&orderBy=desc&limit=4&skip=5
//do research about skip
router.get('/dashboard/classes', auth, combine, (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  let orderBy = req.query.orderBy ? req.query.orderBy : 'desc';
  let limit = 20;
  ClassFeedback.find()
    .populate({ path: 'ownerId', select: 'name' })
    .populate({ path: 'grade', model: Grade })
    .populate({ path: 'teacher', model: Teacher })
    .populate({ path: 'classroom', model: Classroom })
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

//http://localhost:8080/api/classfeedback/class/class_id?5dd98e077bec141260121de2,9843uhk234h3g4k,type=array
/*router.get('/class/class_id', auth, (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === 'array') {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }
  ClassFeedback.find({ _id: { $in: items } })
    .populate('createdBy', ['name', 'avatar'])
    .exec((err, feedback) => {
      if (err) return res.status(400).send(err);
      res.json(feedback);
    });
});*/

router.get('/classes', auth, combine, async (req, res) => {
  try {
    let classes = await ClassFeedback.find({})
      .sort({ date: -1 })
      .populate({ path: 'ownerId', select: 'name' })
      .populate({ path: 'grade', model: Grade })
      .populate({ path: 'teacher', model: Teacher })
      .populate({ path: 'classroom', model: Classroom });
    return res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.get('/class/:class_id', auth, async (req, res) => {
  try {
    const feedback = await ClassFeedback.findOne({ _id: req.params.class_id })
      .populate({ path: 'ownerId', select: 'name' })
      .populate({ path: 'grade', model: Grade })
      .populate({ path: 'teacher', model: Teacher })
      .populate({ path: 'classroom', model: Classroom })
      .populate({ path: 'student', model: StudentLists });
    res.status(200).json(feedback);
    console.log(feedback.ownerId.name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

router.put('/class/:class_id', auth, combine, async (req, res) => {
  try {
    const feedback = await ClassFeedback.findByIdAndUpdate(
      { _id: req.params.class_id },
      req.body,
      { new: true }
    );

    const {
      termCode,
      email,
      lessonContent,
      lessonID,
      gliNews,
      ownerId,
      teacher,
      grade
    } = req.body;
    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    const mailOptions = {
      from: 'GLI Harumi ✔ <jonhzono@gmail.com>',
      to: email,
      subject: 'GLI Harumi Classroom Feedback ✔ ' + `${Date.now().toString()}`,
      html: feedbackTemplate(
        termCode,
        lessonContent,
        lessonID,
        gliNews,
        teacher,
        email,
        ownerId,
        grade
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
    return res
      .status(200)
      .json({ msg: 'Feedback edit Successfully', feedback });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/class/:class_id', auth, admin, async (req, res) => {
  await ClassFeedback.findByIdAndRemove({ _id: req.params.class_id });
  res.json({ msg: 'Remove Successful' });
});

module.exports = router;
