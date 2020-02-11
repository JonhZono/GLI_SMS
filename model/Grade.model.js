const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  }
})

module.exports = Grade = mongoose.model('Grade', GradeSchema);
