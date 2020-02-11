const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Post = require('../../model/Post.model');
const User = require('../../model/User.model');
const admin = require('../../middleware/Admin');
const auth = require('../../middleware/Auth');
const nodemailer = require('nodemailer');
const config = require('config');
const postTemplate = require('../../utils/mail/postTemplate');

//@route        api/post
//@des          Add post
//@access       Private - available only admin
router.post(
  '/add',
  [
    check('title', 'title is require')
      .not()
      .isEmpty(),
    check('image', 'image is require')
      .not()
      .isEmpty(),
    check('type', 'type is require')
      .not()
      .isEmpty()
  ],
  auth,
  admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        title: req.body.title,
        descriptions: req.body.descriptions,
        status: req.body.status,
        event: req.body.event,
        image: req.body.image,
        image1: req.body.image1,
        type: req.body.type,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();

      const { title, descriptions, status, gmailLists, event, type } = req.body;

      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });

      const mailOptions = {
        from: 'GLI - Event & News Letter ✔ <gli.harumi01@gmail.com>',
        to: gmailLists,
        subject:
          'GLI Harumi Event & News Letter ✔ ' + `${Date.now().toString()}`,
        html: postTemplate(title, descriptions, status, event, type)
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
      return res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route        api/post/posts
//@des          Get all posts
//@access       Private - available all user
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

//@route        api/post/:post_id
//@des          Get post by id
//@access       Private - available all user
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id).select('-password');
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(400).json({ msg: 'Server Error' });
  }
});

//@route        api/post/:post_id
//@des          Remove post by id
//@access       Private - available only admin
router.delete('/remove/:post_id', auth, admin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //Check user authorized

    if (!post) {
      return res.status(404).json({ msg: 'Post not found!' });
    }
    await post.remove();
    return res.json({ msg: 'Post remove successfully!' });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return res.status(404).send({
        errors: [
          {
            msg: 'Post not found!',
            success: false
          }
        ]
      });
    }
    return res.status(500).json({ msg: 'Server Error' });
  }
});

//@route        api/post/edit/:post_id
//@des          Edit post by id
//@access       Private - available only admin
router.put(
  '/edit/:post_id',
  auth,
  admin,

  async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        { _id: req.params.post_id },
        req.body,
        { new: true, runValidators: true }
      );
      await post.save();
      const { title, descriptions, status, gmailLists, event, type } = req.body;
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: config.get('USER_EMAIL'),
          pass: config.get('EMAIL_PASS')
        }
      });

      const mailOptions = {
        from: 'GLI Harumi - Event & News Letter ✔ <gli.harumi01@gmail.com>',
        to: gmailLists,
        subject:
          'GLI Harumi Event & News Letter ✔ ' + `${Date.now().toString()}`,
        html: postTemplate(title, descriptions, status, event, type)
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
      res.status(200).json({ msg: 'Post Edit Successfully' });
    } catch (error) {
      console.log(error.message);
      if (error.kind == 'ObjectId')
        return res.status(404).json({ msg: 'Post not found' });
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

//@route        api/post/like/:id
//@des          Add like by id Post
//@access       Private - available to all user
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //POST ALREADY LIKE
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    //push user like ID into like array
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route        api/post/sns/:id
//@des          Add sns by id Post
//@access       Private - available to all user
router.put('/sns/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //POST ALREADY LIKE
    if (
      post.sns.filter(sns => sns.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already accepted sns' });
    }
    //push user like ID into like array
    post.sns.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json(post.sns);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route api/post/get/likes
router.get('/get/likes/:postId', auth, async (req, res) => {
  try {
    //check if post exist
    const likes = await Post.findOne({ _id: req.params.postId })
      .populate('user', ['name'])
      .populate('likes.user', ['name']);
    return res.status(200).json(likes.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
//@route api/post/get/sns
router.get('/get/sns/:postId', auth, async (req, res) => {
  try {
    //check if post exist
    const sns = await Post.findOne({ _id: req.params.postId })
      .populate('user', ['name'])
      .populate('sns.user', ['name']);
    return res.status(200).json(sns.sns);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

//@route        api/post/unlike/:id
//@des          Unlike by id
//@access       Private - available to all user
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //POST ALREADY LIKE
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not like' });
    }
    //push user like ID into like array
    const removeIndex = await post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    await post.likes.splice(removeIndex, 1);
    //res.json({msg: 'You Unlike successfully'})
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: 'Server error' });
  }
});

//@route        api/post/unlike/:id
//@des          Unlike by id
//@access       Private - available to all user
router.put('/sns/no/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //POST ALREADY LIKE
    if (
      post.sns.filter(sns => sns.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not accepted sns yet' });
    }
    //push user like ID into like array
    const removeIndex = await post.sns
      .map(sns => sns.user.toString())
      .indexOf(req.user.id);
    await post.sns.splice(removeIndex, 1);
    //res.json({msg: 'You Unlike successfully'})
    await post.save();
    res.json(post.sns);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: 'Server error' });
  }
});

module.exports = router;
