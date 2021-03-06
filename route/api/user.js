const express = require('express');
const router = express.Router();
const User = require('../../model/User.model');
const auth = require('../../middleware/Auth');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const admin = require('../../middleware/Admin');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');
const welcomeTemplate = require('../../utils/mail/welcomeEmail');
require('dotenv').config();
const SALT_ID = 10;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

router.post('/uploadimage', auth, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    result => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto'
    }
  );
});

router.get('/removeimage', auth, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send('ok');
  });
});

//@route        api/user/auth
//@des          User profile
//@access       Test auth route
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

router.get('/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'server error' }] });
  }
});
//@route        api/user/login
//@des          User authentication
//@access       Available role admin
router.post(
  '/login',
  [
    check('email', 'Email is require').isEmail(),
    check('password', 'Password is require up to 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credential',
              success: false
            }
          ]
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credential',
              success: false
            }
          ]
        });
      }

      //return jsonwebtoke
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          performance: user.performance,
          history: user.history
        }
      };
      jwt.sign(
        payload,
        //config.get(process.env.SECRET_PASS),
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.send({
            success: true,
            role: user.role,
            token
          });
        }
      );
    } catch (err) {
      return res.status(400).json({
        msg: 'Server Error'
      });
    }
  }
);

//@route        api/user/register
//@des          Create User
//@access       Avaialable role 1 admin
router.post(
  '/register',
  [
    check('name', 'name is require')
      .not()
      .isEmpty(),
    check('role', 'role is require [student, staff, admin]')
      .not()
      .isEmpty(),
    check('email', 'email is require').isEmail(),
    check('password', 'password require up to 6 characters').isLength({
      min: 6
    })
    //check('role', 'role is require').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User is already existed' }] });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        password,
        avatar,
        role
      });

      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });
      const mailOptions = {
        from: 'GLI Harumi Welcome ✔ <gli.harumi01@gmail.com>',
        to: email,
        subject:
          'GLI Harumi Your New SMS Account ✔ ' + `${Date.now().toString()}`,
        html: welcomeTemplate(name, email, password)
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
      //encrypt pass
      const salt = await bcrypt.genSalt(SALT_ID);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jwt back to client header
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          performance: user.performance,
          history: user.history
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        //config.get(process.env.SECRET_PASS),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            msg: `Congratulations!, ${role} is register successfully`,
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: [{ msg: 'Server Error' }] });
    }
  }
);

router.put('/edit/:user_id', auth, admin, async (req, res) => {
  [
    check('name', 'name is require')
      .not()
      .isEmpty(),
    check('email', 'email is require').isEmail()
  ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const user = await User.findByIdAndUpdate(
          { _id: req.params.user_id },
          req.body,
          {
            new: true
          }
        );
        await user.save();

        res
          .status(200)
          .json({ msg: 'User Update Successfully', success: true });
      } catch (error) {
        console.log(error.message);
        if (error)
          res.status(400).json({
            errors: [{ msg: 'Please check it again!' }]
          });
      }
    };
});
module.exports = router;
