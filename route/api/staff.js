const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Staff = require('../../model/Staff.model');
const auth = require('../../middleware/Auth');
const admin = require('../../middleware/Admin');

//@route        api/staff/profile/me
//@des          user profile
//@access       Private
router.get('/profile/me', auth, async (req, res) => {
  try {
    const profile = await Staff.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      res.status(400).json({ msg: 'There is no profile found' });
    }
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});
//@route        api/staff/profile
//@des          create and update staff profile
//@access       Private
router.post(
  '/profile',
  [
    check('name', 'staff name is require')
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
  ],
  auth,
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
        email
      } = req.body;

      const staffFields = {};
      staffFields.user = req.user.id;
      if (name) staffFields.name = name;
      if (gender) staffFields.gender = gender;
      if (phone) staffFields.phone = phone;
      if (bio) staffFields.bio = bio;
      if (marital_status) staffFields.marital_status = marital_status;
      if (birth) staffFields.birth = birth;
      if (work_experiences) staffFields.work_experiences = work_experiences;
      if (country) staffFields.country = country;
      if (position) staffFields.position = position;
      if (email) staffFields.email = email;
      if (addresses) {
        staffFields.addresses = addresses
          .split(',')
          .map(address => address.trim());
        console.log(staffFields.addresses);
      }
      if (bank_account_details) {
        staffFields.bank_account_details = bank_account_details
          .split(',')
          .map(bank => bank.trim());
        console.log(staffFields.bank_account_details);
      }

      let staff = await Staff.findOne({ user: req.user.id });
      if (staff) {
        //update staff profile
        staff = await Staff.findOneAndUpdate(
          { user: req.user.id },
          { $set: staffFields },
          { new: true }
        );
        return res.json(staff);
      }
      staff = new StaffProfile(staffFields);
      await staff.save();
      res.json(staff);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route        api/profile/admin/all
//@des          Get All User Profile
//@access       Private/admin only
router.get('/admin/all', auth, admin, async (req, res) => {
  try {
    const profiles = await Staff.find().populate('user', [
      'name',
      'avatar',
      'role',
      'email'
    ]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(400).json('Server Error');
  }
});

//@route        api/profile/admin/all
//@des          Get All User Profile
//@access       Private/admin only
router.delete('/admin/delete', auth, admin, async (req, res) => {
  try {
    //delete user and profile
    await Staff.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json('User Delete');
  } catch (error) {
    console.log(error.message);
    res.status(400).send('Server Error');
  }
});

//@route        api/profile/user/user_id
//@des          Get user profile by id
//@access       Public
router.get('/user/:user_id',auth, async (req, res) => {
  try {
    const profile_id = await Staff.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar', 'role', 'email']);
    if (!profile_id) res.status(404).json({ msg: 'Profile not found' });
    res.json(profile_id);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      res.status(404).json('Profile not found');
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
