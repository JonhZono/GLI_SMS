const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    name: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    descriptions: {
      type: String
    },
    event: {
      type: String
    },
    status: {
      type: String
    },
    type: {
      type: String
    },
    image: {
      type: Array,
      default: [],
      required: true
    },
    image1: {
      type: Array,
      default: []
    },
    gmailLists: {
      type: Array,
      default: [],
      required: true
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ],
    sns: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ],
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model('post', PostSchema);
