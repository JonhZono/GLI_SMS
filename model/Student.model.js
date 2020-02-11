const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    birth: {
      type: String,
      required: true
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade',
      required: true
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true
    },
    school: {
      type: String,
      required: true,
      default: '@GLI'
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    admission: {
      type: String,
      require: true
    },
    father: {
      type: String,
      maxlength: 100,
      required: true
    },
    father_occupation: {
      type: String
    },
    mother: {
      type: String,
      maxlength: 100
    },
    addresses: {
      type: [String],
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    image: {
      type: Array,
      default: []
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  {
    timestamps: true
  }
);

module.exports = StudentProfile = mongoose.model('student', ProfileSchema);
