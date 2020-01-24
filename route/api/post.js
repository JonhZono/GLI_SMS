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
    check('descriptions', 'descriptions is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .not()
      .isEmpty(),
    check('image', 'image is require')
      .not()
      .isEmpty(),
    check('gmailLists', 'gmail lists is require').isEmail()
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
        image: req.body.image,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();

      const { title, descriptions, image, status, gmailLists } = req.body;
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
        html: postTemplate(title, descriptions, image, status)
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
    res.json(posts);
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
    res.json(post);
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
  [
    check('title', 'title is require')
      .not()
      .isEmpty(),
    check('descriptions', 'descriptions is require')
      .not()
      .isEmpty(),
    check('status', 'status is require')
      .not()
      .isEmpty(),
    check('image', 'image is require')
      .not()
      .isEmpty(),
    check('gmailLists', 'gmail lists is require').isEmail()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }
    try {
      /*if(post_id.toString() == filter(post_id => post_id == post._id)) {
            return res.status(404).json({msg: 'Post not found'})
        }*/
      const post = await Post.findByIdAndUpdate(
        { _id: req.params.post_id },
        req.body,
        { new: true, runValidators: true }
      );
      await post.save();
      const { title, descriptions, image, status, gmailLists } = req.body;
      console.log(image);
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
        html: postTemplate(title, descriptions, image, status)
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
    res.json(post.likes);
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

//@route        api/post/comment/:comment_id
//@des          Comment by User id
//@access       Private - available to all user
router.put(
  '/comment/:comment_id',
  [
    check('descriptions', 'descriptions is require')
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.comment_id);
      const newComment = new Post({
        descriptions: req.body.descriptions,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      //push newComment into post and save
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

//@route        api/post/comment/:post_id/:comment_id
//@des          User delete their own comment
//@access       Private - available to all user
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    //Pull out comment
    const comment = await post.comments.find(
      comment => comment.id === req.params.comment_id
    );
    //Make sure comment existed
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    //Check user own that comment or not
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized to delete comment' });
    }
    //Remove comment
    const removeIndex = await post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
