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
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    image: {
      type: Array,
      default: []
    },
    gmailLists: {
      type: Array,
      default: [],
      required: true
    },
    avatar: {
      type: String
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
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        descriptions: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model('post', PostSchema);
