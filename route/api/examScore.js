const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const ExamScore = require('../../model/ExamScore.model');
const combine = require('../../middleware/Combine');

/**@create
 * api/exam/score/create
 * staff & admin
 */
router.post(
  '/score/create',
  auth,
  combine,
  [
    (check('writing', 'writing is require')
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
      .isEmpty())
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
        ownerId
      } = req.body;
      const exam = new ExamScore({
        writing,
        reading,
        listening,
        speaking,
        examName,
        ownerId
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
      .populate({ path: 'ownerId', select: 'name' });
    return res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/score/:exam_id', auth, (req, res) => {
  ExamScore.findOne({ _id: req.params.exam_id })
    .populate({ path: 'ownerId', select: 'name' })
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
