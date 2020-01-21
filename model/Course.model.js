const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  }
})

module.exports = Course = mongoose.model('Course', CourseSchema);
