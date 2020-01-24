const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const Teacher = require('../../model/Teacher.model');
const Performance = require('../../model/Performance.model');
const combine = require('../../middleware/Combine');

/**@create
 * api/analyze/create
 * staff & admin
 */
router.post(
  '/create',
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
    check('participation', 'participation is require')
      .not()
      .isEmpty(),
    check('active', 'active is require')
      .not()
      .isEmpty(),
    check('attitude', 'attitude is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty(),
    check('ownerId', 'ownerId is require')
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
        participation,
        active,
        attitude,
        ownerId,
        teacher
      } = req.body;
      const performance = new Performance({
        writing,
        reading,
        listening,
        speaking,
        participation,
        active,
        attitude,
        ownerId,
        teacher
      });

      await performance.save();
      res.status(200).json({ msg: 'Performance Create Successfully' });
    } catch (error) {
      if (error)
        res.status(400).json({
          errors: [{ msg: 'Maximum Score of Each Subject is 25...!' }]
        });
    }
  }
);
//for admin and staff for analyze module
router.get('/performances', auth, combine, async (req, res) => {
  try {
    let performance = await Performance.find({})
      .sort({ date: -1 })
      .populate({ path: 'ownerId', select: 'name' })
      .populate({ path: 'teacher', model: Teacher });
    return res.json(performance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

//for dashboard of admin & staff view
router.get('/get/dashboard/performance', auth, combine, async (req, res) => {
  return Performance.find()
    .sort({ date: -1 })
    .populate('ownerId', ['name'])
    .populate({ path: 'teacher', model: Teacher })
    .exec((err, performance) => {
      if (err)
        res.status(500).json({ errors: [{ msg: 'Something went wrong!' }] });

      res.status(200).json(performance[1]);
    });
});

//for dashboard of admin & staff view
router.get(
  '/get/dashboard/staff/performance',
  auth,
  combine,
  async (req, res) => {
    return Performance.find()
      .sort({ date: -1 })
      .populate('ownerId', ['name'])
      .populate({ path: 'teacher', model: Teacher })
      .exec((err, performance) => {
        if (err)
          res.status(500).json({ errors: [{ msg: 'Something went wrong!' }] });

        res.status(200).json(performance[2]);
      });
  }
);

router.get('/performance/:perform_id', auth, (req, res) => {
  Performance.findOne({ _id: req.params.perform_id })
    .populate({ path: 'ownerId', select: 'name' })
    .populate({ path: 'teacher', model: Teacher })
    .exec((err, performance) => {
      if (err) res.status(400).json({ msg: 'Something went wrong!' });
      res.status(200).json(performance);
    });
});

router.put('/performance/:perform_id', auth, combine, async (req, res) => {
  await Performance.findByIdAndUpdate(
    { _id: req.params.perform_id },
    req.body,
    { new: true }
  );
  res.status(200).json({ msg: 'Analysis Edit Successfully', success: true });
});

router.delete('/performance/:perform_id', auth, admin, async (req, res) => {
  await Performance.findByIdAndRemove({ _id: req.params.perform_id });
  res.status(200).json({ msg: 'Remove Successful' });
});

module.exports = router;
