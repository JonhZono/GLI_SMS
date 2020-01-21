const mongoose = require('mongoose');

const ExamScoreSchema = new mongoose.Schema(
  {
    writing: {
      type: Number,
      default: 0, //0/25
      max: 25,
      required: true
    },
    reading: {
      type: Number,
      default: 0, //0/25
      max: 25,
      required: true
    },
    listening: {
      type: Number,
      default: 0, //0/25
      max: 25,
      required: true
    },
    speaking: {
      type: Number,
      default: 0, //0/25
      max: 25,
      required: true
    },
    examName: {
      type: String,
      default: 'GLIExam',
      maxlength: 50,
      required: true
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = ExamScore = mongoose.model('ExamScore', ExamScoreSchema);
