const express = require('express');
const router = express.Router();
const auth = require('../../middleware/Auth');
const student = require('../../middleware/Student');
const Student = require('../../model/Student.model');
const StudentLists = require('../../model/StudentLists.model');
const Classroom = require('../../model/Classroom.model');
const Grade = require('../../model/Grade.model');
const Teacher = require('../../model/Teacher.model');
const { check, validationResult } = require('express-validator');
const ClassFeedback = require('../../model/ClassFeedback.model');
const Course = require('../../model/Course.model');
const Performance = require('../../model/Performance.model');
const ExamScore = require('../../model/ExamScore.model');
const Fee = require('../../model/DueFee.model');

//@route        api/student/profile/me
//@des          user profile
//@access       Available to student
router.get('/profile/me', auth, async (req, res) => {
  try {
    const profile = await Student.findOne({
      user: req.user.id
    })
      .populate('user', ['name', 'avatar'])
      .populate({ path: 'grade', model: Grade })
      .populate({ path: 'teacher', model: Teacher })
      .populate({ path: 'classroom', model: Classroom })
      .populate({ path: 'course', model: Course });
    if (!profile) {
      res.status(400).json({ msg: 'There is no profile found' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

//@route        api/student/createprofile
//@des          create and update user profile
//@access       Private
router.post(
  '/createprofile',
  [
    check('name', 'name is require')
      .not()
      .isEmpty(),
    check('email', 'email is require').isEmail(),
    check('gender', 'gender is require')
      .not()
      .isEmpty(),
    check('birth', 'birth is require')
      .not()
      .isEmpty(),
    check('classroom', 'classroom is require')
      .not()
      .isEmpty(),
    check('teacher', 'teacher is require')
      .not()
      .isEmpty(),
    check('grade', 'grade is require')
      .not()
      .isEmpty(),
    check('course', 'course is require')
      .not()
      .isEmpty(),
    check('admission', 'admission is require')
      .not()
      .isEmpty(),
    check('father', 'father is require')
      .not()
      .isEmpty(),
    check('father_occupation', 'occupation is require')
      .not()
      .isEmpty(),
    check('mother', 'mother is require')
      .not()
      .isEmpty(),
    check('addresses', 'addresses is require')
      .not()
      .isEmpty(),
    check('phone', 'phone is require')
      .not()
      .isEmpty()
  ],
  auth,
  student,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    //Re-structure the body
    const {
      name,
      gender,
      birth,
      teacher,
      school,
      classroom,
      course,
      grade,
      admission,
      father,
      father_occupation,
      mother,
      addresses,
      phone,
      email
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (gender) profileFields.gender = gender;
    if (birth) profileFields.birth = birth;
    if (teacher) profileFields.teacher = teacher;
    if (school) profileFields.school = school;
    if (classroom) profileFields.classroom = classroom;
    if (course) profileFields.course = course;
    if (admission) profileFields.admission = admission;
    if (grade) profileFields.grade = grade;
    if (mother) profileFields.mother = mother;
    if (father_occupation) profileFields.father_occupation = father_occupation;
    if (father) profileFields.father = father;
    if (phone) profileFields.phone = phone;
    if (email) profileFields.email = email;
    if (addresses) {
      profileFields.addresses = addresses
        .split(', ')
        .map(address => address.trim());
      console.log(profileFields.addresses);
    }
    try {
      //update
      let profile = await Student.findOne({ user: req.user.id });
      if (profile) {
        profile = await Student.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        console.log('Update profile success');
        return res.json(profile);
      }
      //if no profile then create
      profile = new StudentProfile(profileFields);
      await profile.save();
      console.log('Add new profile success');
      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: 'Server Error' });
    }
  }
);

//@route        api/post/edit/:profile_id
//@des          Update Profile by id
//@access       Private - available only admin
router.put('/edit/:profile_id', auth, student, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      { _id: req.params.profile_id },
      req.body,
      { new: true, runValidators: true }
    );
    await student.save();
    res.status(200).json({ msg: 'Profile Update Successfully' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Profile not found' });
    res.status(500).json({ msg: 'Server error' });
  }
});
router.delete('/remove/:profile_id', auth, student, async (req, res) => {
  try {
    await Student.findByIdAndRemove({
      _id: req.params.profile_id
    });
    res.status(200).json({ msg: 'Profile Remove Successfully' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Profile not found' });
    res.status(500).json({ msg: 'Server error' });
  }
});
//@route        api/student/:user_id
//@des          Get user profile by id
//@access       Private
router.get('/:user_id', auth, async (req, res) => {
  try {
    const profile_id = await Student.findById({
      _id: req.params.user_id
    }).populate('user', ['name', 'avatar', 'role', 'email']);
    if (!profile_id) res.status(404).json({ msg: 'Profile not found' });
    res.json(profile_id);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
});
//@route        api/student/classes
//@des          Get ClassFeedbacks
//@access       Private
router.get('/classfeedback/all/:ownerId', auth, student, async (req, res) => {
  try {
    const classes = await ClassFeedback.find({
      ownerId: req.params.ownerId
    })
      .sort({ date: -1 })
      .populate('ownerId', ['name'])
      .populate({ path: 'grade', model: Grade })
      .populate({ path: 'teacher', model: Teacher })
      .populate({ path: 'classroom', model: Classroom })
      .populate({ path: 'student', model: StudentLists });
    if (!classes)
      res.status(404).json({ errors: [{ msg: 'Feedback not found' }] });

    res.status(200).json(classes);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      res.status(404).json({
        errors: [{ msg: 'Feedback not found' }]
      });
    }
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

//student route for dashboard feedback
router.get('/dashboard/classes', auth, student, (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  let orderBy = req.query.orderBy ? req.query.orderBy : 'desc';
  let limit = 10;
  ClassFeedback.find({ ownerId: req.user.id })
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

//student route for dashboard exam
router.get('/dashboard/exam/scores', auth, student, (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
  let orderBy = req.query.orderBy ? req.query.orderBy : 'desc';
  let limit = 10;
  ExamScore.find({ ownerId: req.user.id })
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

router.get('/performance/all/:ownerId', auth, async (req, res) => {
  try {
    const performance = await Performance.find({
      ownerId: req.params.ownerId
    })
      .sort({ date: -1 })
      .populate('ownerId', ['name']);
    if (!performance)
      res.status(404).json({ errors: [{ msg: 'Performance not found' }] });

    res.status(200).json(performance);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      res.status(404).json({
        errors: [{ msg: 'Performance not found' }]
      });
    }
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

//end point for dashboard
router.get('/get/performance/me', auth, student, (req, res) => {
  return Performance.find({ ownerId: req.user.id })
    .sort({ date: -1 })
    .populate('ownerId', ['name'])
    .exec((err, performance) => {
      if (err)
        res.status(500).json({ errors: [{ msg: 'Something went wrong!' }] });
      //console.log(performance);
      res.status(200).json(performance[0]);
    });
});

router.get('/exam/score/all/:ownerId', auth, async (req, res) => {
  try {
    const exam = await ExamScore.find({
      ownerId: req.params.ownerId
    })
      .sort({ date: -1 })
      .populate('ownerId', ['name']);
    if (!exam) res.status(404).json({ errors: [{ msg: 'Exam not found' }] });

    res.status(200).json(exam);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      res.status(404).json({
        errors: [{ msg: 'Exam not found' }]
      });
    }
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

router.get('/duefee/all/:receiver', auth, async (req, res) => {
  try {
    const fee = await Fee.find({ receiver: req.params.receiver })
      .sort({ date: -1 })
      .populate('receiver', ['name']);
    if (!fee) res.status(404).json({ errors: [{ msg: 'Fee not found' }] });
    res.status(200).json(fee);
  } catch (error) {
    if (error.kind == 'ObjectId') {
      res.status(404).json({
        errors: [{ msg: 'Fee not found' }]
      });
    }
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'server error' }] });
  }
});

module.exports = router;
