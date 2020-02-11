const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true
  }
})

module.exports = Teacher = mongoose.model('Teacher', TeacherSchema);
