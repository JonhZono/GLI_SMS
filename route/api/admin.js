const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../model/User.model');
const Admin = require('../../model/Admin.model');
const Student = require('../../model/Student.model');
const Staff = require('../../model/Staff.model');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');
const combine = require('../../middleware/Combine');
const ClassFeedback = require('../../model/ClassFeedback.model');

//@route        api/admin/profile/me
//@des          user profile
//@access       Available role 1 admin
router.get('/profile/me', auth, admin, async (req, res) => {
  try {
    const profile = await Admin.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile found' });
    }
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

//@route        api/admin/profile
//@des          create and update admin profile
//@access       Private
router.post(
  '/profile',
  [
    check('name', 'name is require')
      .not()
      .isEmpty(),
    check('gender', 'gender is require')
      .not()
      .isEmpty(),
    check('phone', 'phone is require')
      .not()
      .isEmpty(),
    check('marital_status', 'marital status is require')
      .not()
      .isEmpty(),
    check('birth', 'birth is require')
      .not()
      .isEmpty(),
    check('work_experiences', 'work experience is require')
      .not()
      .isEmpty(),
    check('addresses', 'address is require')
      .not()
      .isEmpty(),
    check('country', 'country is require')
      .not()
      .isEmpty(),
    check('position', 'position is require')
      .not()
      .isEmpty(),
    check('email', 'email is require').isEmail(),
    check('bio', 'bio is require')
      .not()
      .isEmpty(),
    check('admission', 'admission is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(200).json({ errors: errors.array() });

    try {
      const {
        name,
        gender,
        phone,
        bio,
        marital_status,
        birth,
        work_experiences,
        addresses,
        country,
        bank_account_details,
        position,
        email,
        admission
      } = req.body;

      const adminFields = {};
      adminFields.user = req.user.id;
      if (name) adminFields.name = name;
      if (gender) adminFields.gender = gender;
      if (phone) adminFields.phone = phone;
      if (bio) adminFields.bio = bio;
      if (marital_status) adminFields.marital_status = marital_status;
      if (birth) adminFields.birth = birth;
      if (work_experiences) adminFields.work_experiences = work_experiences;
      if (country) adminFields.country = country;
      if (position) adminFields.position = position;
      if (admission) adminFields.admission = admission;
      if (email) adminFields.email = email;
      if (addresses) {
        adminFields.addresses = addresses
          .split(', ')
          .map(address => address.trim());
      }
      if (bank_account_details) {
        adminFields.bank_account_details = bank_account_details
          .split(', ')
          .map(bank => bank.trim());
      }

      let admin = await Admin.findOne({ user: req.user.id });
      if (admin) {
        //update admin profile
        admin = await Admin.findOneAndUpdate(
          { user: req.user.id },
          { $set: adminFields },
          { new: true }
        );
        return res.json(admin);
      }
      //create new profile
      admin = new AdminProfile(adminFields);
      await admin.save();
      res.json(admin);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route        api/admin/edit/:profile_id
//@des          Update Profile by id
//@access       Private - available only student
router.put('/edit/:profile_id', auth, admin, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      { _id: req.params.profile_id },
      req.body,
      { new: true, runValidators: true }
    );
    await admin.save();
    res.status(200).json({ msg: 'Profile Update Successfully' });
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Profile not found' });
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route        api/admin/user_accounts
//@des          Get All User ID
//@access       Private/admin only for Generate User Module
router.get('/user_accounts', auth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ date: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

//for total students select fields
router.get('/student/accounts', auth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ date: -1 });

    const studentLists = users.filter(user => user.role === 'student');
    res.status(200).json(studentLists);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

//@route        api/admin/edit/student/profile/:profile_id
//@des          Edit Student profile By ID
//@access       Private/admin only
router.put('/edit/student/:profile_id', auth, admin, async (req, res) => {
  try {
    let profile_id = await Student.findById({ _id: req.params.profile_id });

    if (profile_id) {
      profile_id = await Student.findByIdAndUpdate(
        { _id: req.params.profile_id },
        req.body,
        { new: true, runValidators: true }
      );
      res.status(200).json({ msg: 'Profile Update Successfully' });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      res.status(400).json('Profile not found');
    }
    res.status(500).send('Server Error');
  }
});
// api/admin/get/student/profile?id=profile_id
router.get('/get/student/profile/:profile_id', auth, async (req, res) => {
  try {
    let profile_id = await Student.findById({ _id: req.params.profile_id })
      .populate('user', ['_id', 'name', 'avatar', 'role', 'email'])
      .populate('teacher', ['name'])
      .populate('course', ['name'])
      .populate('classroom', ['name'])
      .populate('grade', ['name']);

    res.status(200).json(profile_id);
  } catch (error) {
    res.status(500).json('Server Error');
  }
});
router.get('/get/staff/profile/:profile_id', auth, async (req, res) => {
  try {
    let profile_id = await Staff.findById({
      _id: req.params.profile_id
    }).populate('user', ['_id', 'name', 'avatar', 'role', 'email']);

    res.status(200).json(profile_id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});
//api/admin/get/profile/:profile_id
router.get('/get/profile/:profile_id', auth, async (req, res) => {
  try {
    let profileInfo = await Admin.findById({
      _id: req.params.profile_id
    }).populate('user', ['_id', 'name', 'avatar', 'role', 'email']);

    return res.status(200).json(profileInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});
//@route        api/admin/edit/staff/profile/:profile_id
//@des          Edit Staff profile By ID
//@access       Private/admin only
router.put('/edit/staff/:profile_id', auth, combine, async (req, res) => {
  try {
    let profile_id = await Staff.findById({ _id: req.params.profile_id });

    if (profile_id) {
      profile_id = await Staff.findByIdAndUpdate(
        { _id: req.params.profile_id },
        req.body,
        { new: true, runValidators: true }
      );
      return res.status(200).json({ msg: 'Profile Update Successfully' });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      res.status(400).json('Profile not found');
    }
    res.status(500).json('Server Error');
  }
});
//@route        api/admin/remove/
//@des          Remove User ID
//@access       Private/admin only
router.delete('/remove/:user_id', auth, admin, async (req, res) => {
  try {
    //delete user and profile
    await User.findByIdAndRemove({ _id: req.params.user_id });
    await ClassFeedback.findOneAndRemove({ _id: req.params.user_id });
    //consider to delete their account as well by checking with their role student || staff
    return res.status(200).json({ msg: 'User Deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//@route        api/admin/remove
//@des          Remove Student Profile ID
//@access       Private/admin only
/*router.delete('/remove/student/:profile_id', auth, admin, async (req, res) => {
  try {
    const studentProfiles = await Student.findById({
      _id: req.params.profile_id
    });
    const removeIndex = studentProfiles
      .map(student => student._id)
      .indexOf(req.params.profile_id);
    studentProfiles.splice(removeIndex, 1);
    await studentProfiles.save();
    res.json(studentProfiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});*/
router.delete('/remove/student/:profile_id', auth, admin, async (req, res) => {
  try {
    //DELETE STUDENT PROFILE
    await Student.findByIdAndRemove({
      _id: req.params.profile_id
    });

    res.status(200).json({ msg: 'Student Profile Deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.get('/get/student/profiles', auth, combine, async (req, res) => {
  try {
    //GET All STUDENT PROFILE
    const studentProfiles = await Student.find({})
      .sort({ date: -1 })
      .populate('teacher')
      .populate('classroom')
      .populate('course')
      .populate('grade')
      .populate('user', ['_id', 'name', 'avatar', 'role', 'email']);
    res.status(200).json(studentProfiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: [{ msg: 'Server Error' }] });
  }
});

router.get('/get/staff/profiles', auth, async (req, res) => {
  try {
    //GET All STAFF PROFILE
    const staffProfiles = await Staff.find({}).populate('user', [
      '_id',
      'name',
      'avatar',
      'role',
      'email'
    ]);
    res.status(200).json(staffProfiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//@route        api/admin/remove
//@des          Remove Staff Profile ID
//@access       Private/admin only
router.delete('/remove/staff/:profile_id', auth, admin, async (req, res) => {
  try {
    //DELETE STAFF PROFILE
    await Staff.findByIdAndRemove({ _id: req.params.profile_id });
    res.status(200).json({ msg: 'Staff Profile Deleted' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

//@route        api/admin/remove
//@des          Remove Admin Profile ID
//@access       Private/admin only
router.delete('/remove/profile/:profile_id', auth, admin, async (req, res) => {
  try {
    await Admin.findByIdAndRemove({
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

//@route        api/admin/get/user_id
//@des          Get user profile by id
//@access       Admin
router.get('/get/:user_id', auth, admin, async (req, res) => {
  try {
    const user_id = await User.findOne({ _id: req.params.user_id }).select(
      '-password'
    );
    if (!user_id) res.status(400).json({ msg: 'User not found' });
    res.json(user_id);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(400).json('User not found');
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
