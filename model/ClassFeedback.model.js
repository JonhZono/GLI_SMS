const mongoose = require('mongoose');

const ClassFeedbackSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    lessonID: {
      type: String,
      required: true
    },
    //format Term/Unit/Week/Class/Theme
    termCode: {
      type: String,
      required: true
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'classroom',
      required: true
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'grade',
      required: true
    },
    //we know exactly with staff is creating the report by seeing the teacher's name of every report
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher',
      required: true
    },
    //consider about looping object
    //format reading, writing, listening and speaking

    lessonContent: {
      type: String,
      required: true
    },
    gliNews: {
      type: String,
      required: true
    },
    //sending report to the parents and follow by administrator
    publish: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      maxlength: 50
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = ClassFeedback = mongoose.model(
  'classfeedback',
  ClassFeedbackSchema
);
