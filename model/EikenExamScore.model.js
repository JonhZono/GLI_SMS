const mongoose = require('mongoose');

const EikenExamScoreSchema = new mongoose.Schema(
  {
    reading: {
      type: Number,
      default: 0, //0/38
      max: 38,
      required: true
    },
    writing: {
      type: Number,
      default: 0, //0/16
      max: 16
    },
    listening: {
      type: Number,
      default: 0, //0/30
      max: 30,
      required: true
    },
    attitude: {
      type: Number,
      default: 0, //0/3
      max: 3
    },
    qna: {
      type: Number,
      default: 0, //0/25
      max: 25
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

module.exports = EikenExamScore = mongoose.model(
  'EikenExamScore',
  EikenExamScoreSchema
);
