const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Teacher = require('../../model/Teacher.model');
const StudentLists = require('../../model/StudentLists.model');
const Grade = require('../../model/Grade.model');
const Course = require('../../model/Course.model');
const Classroom = require('../../model/Classroom.model');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');

/**
 * @TEACHER
 */
//@teacher Lists
router.post(
  '/add/teacher',
  [
    check('name', 'teacher name is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const teacher = new Teacher(req.body);

    teacher.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        teacher: doc,
        msg: 'Teacher Add Successfully'
      });
    });
  }
);

router.get('/get/teachers', (req, res) => {
  Teacher.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc);
  });
});

router.put('/edit/teacher/:teacher_id', auth, admin, async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      { _id: req.params.teacher_id },
      req.body,
      { new: true }
    );
    await teacher.save();
    res.status(200).json({ msg: 'Teacher update successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/teacher/:teacher_id', auth, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacher_id);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/remove/teacher/:teacher_id', auth, admin, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacher_id);
    //Check user authorized

    if (!teacher) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Teacher not found!',
            success: false
          }
        ]
      });
    }
    await teacher.remove();
    return res.status(200).json({
      msg: 'Teacher remove successfully',
      success: true
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(404).json({
        errors: [
          {
            msg: 'Teacher not found',
            success: false
          }
        ]
      });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * @STUDENTs
 */
//@student Lists
router.post(
  '/add/student',
  [
    check('name', 'student name is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const { name } = req.body;
    const student = new StudentLists({ name });

    student.save((err, doc) => {
      if (err) return { success: false, err };
      return res.status(200).json({
        success: true,
        student: doc,
        msg: 'Student add successfully'
      });
    });
  }
);

router.get('/get/students', (req, res) => {
  StudentLists.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc);
  });
});

router.put('/edit/student/:student_id', auth, admin, async (req, res) => {
  try {
    const student = await StudentLists.findByIdAndUpdate(
      { _id: req.params.student_id },
      req.body,
      { new: true }
    );
    await student.save();
    res.status(200).json({ msg: 'Student update successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/student/:student_id', auth, async (req, res) => {
  try {
    const student = await StudentLists.findById(req.params.student_id);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/remove/student/:student_id', auth, admin, async (req, res) => {
  try {
    const student = await StudentLists.findById(req.params.student_id);
    //Check user authorized

    if (!student) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Student not found!',
            success: false
          }
        ]
      });
    }
    await student.remove();
    return res.status(200).json({
      msg: 'Student remove successfully',
      success: true
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(404).json({
        errors: [
          {
            msg: 'Student not found',
            success: false
          }
        ]
      });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * @GRADES
 */
//@grade Lists
router.post(
  '/add/grade',
  [
    check('name', 'grade name is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const grade = new Grade(req.body);

    grade.save((err, doc) => {
      if (err) res.status(400).send({ success: false, err });
      return res.status(200).send({
        success: true,
        grade: doc,
        msg: 'Grade add successfully'
      });
    });
  }
);

router.put('/edit/grade/:grade_id', auth, admin, async (req, res) => {
  try {
    const grade = await Grade.findByIdAndUpdate(
      { _id: req.params.grade_id },
      req.body,
      { new: true }
    );
    await grade.save();
    res.status(200).json({ msg: 'Grade update successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/grade/:grade_id', auth, async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.grade_id);
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/remove/grade/:grade_id', auth, admin, async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.grade_id);
    //Check user authorized

    if (!grade) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Grade not found!',
            success: false
          }
        ]
      });
    }
    await grade.remove();
    return res.status(200).json({
      msg: 'Grade remove successfully',
      success: true
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(404).json({
        errors: [
          {
            msg: 'Grade not found',
            success: false
          }
        ]
      });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/grades', (req, res) => {
  Grade.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc);
  });
});

/**
 * @COURSES
 */
//@course Lists
router.post(
  '/add/course',
  [
    check('name', 'course name is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });

    const course = new Course(req.body);

    course.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        course: doc,
        msg: 'Course created successfully'
      });
    });
  }
);

router.get('/get/courses', (req, res) => {
  Course.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc);
  });
});

router.put('/edit/course/:course_id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      { _id: req.params.course_id },
      req.body,
      { new: true }
    );
    await course.save();
    res.status(200).json({ msg: 'Course updated successfully', success: true });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/course/:course_id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/remove/course/:course_id', auth, admin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.course_id);
    //Check user authorized

    if (!course) {
      return res.status(404).json({
        errors: [
          {
            msg: 'Course not found!',
            success: false
          }
        ]
      });
    }
    await course.remove();
    return res.status(200).json({
      msg: 'Course removed successfully',
      success: true
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(404).json({
        errors: [
          {
            msg: 'Course not found',
            success: false
          }
        ]
      });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

/**
 * @CLASSROOM
 */
//@classroom lists
router.post(
  '/add/classroom',
  [
    check('name', 'classroom name is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).send({ errors: errors.array() });
    try {
      const classroom = new Classroom(req.body);
      await classroom.save();
      res.status(200).json({
        success: true,
        classroom,
        msg: 'Classroom created successfully'
      });
    } catch (error) {
      res.status(500).json({ msg: 'Server Error', success: false });
    }
  }
);

//GET list classrooms
router.get('/get/classrooms', (req, res) => {
  Classroom.find({}, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(doc);
  });
});

router.put('/edit/classroom/:classroom_id', auth, admin, async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(
      { _id: req.params.classroom_id },
      req.body,
      { new: true }
    );
    await classroom.save();
    res.status(200).json({ msg: 'Classroom update successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/get/classroom/:classroom_id', auth, async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroom_id);
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete(
  '/remove/classroom/:classroom_id',
  auth,
  admin,
  async (req, res) => {
    try {
      const classroom = await Classroom.findById(req.params.classroom_id);
      //Check user authorized

      if (!classroom) {
        return res.status(404).json({
          errors: [
            {
              msg: 'Classroom not found!',
              success: false
            }
          ]
        });
      }
      await classroom.remove();
      return res.status(200).json({
        msg: 'Classroom remove successfully',
        success: true
      });
    } catch (error) {
      if (error.kind == 'ObjectId') {
        return res.status(404).json({
          errors: [
            {
              msg: 'Classroom not found',
              success: false
            }
          ]
        });
      }
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
