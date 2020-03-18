const mongoose = require('mongoose');

const JuniorEikenExamScoreSchema = new mongoose.Schema(
  {
    vocabulary: {
      type: Number,
      default: 0, //0/26
      max: 26
    },
    conversation: {
      type: Number,
      default: 0, //0/4
      max: 4,
      required: true
    },
    sentence: {
      type: Number,
      default: 0, //0/8
      max: 8
    },
    alphabet: {
      type: Number,
      default: 0, //0/8
      max: 8
    },
    level: {
      type: String,
      required: true
    },
    gmail: {
      type: String,
      maxlength: 80
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    name: {
      type: String,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'teacher'
    },
    examDate: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = JuniorEikenExamScore = mongoose.model(
  'JuniorEikenExamScore',
  JuniorEikenExamScoreSchema
);
