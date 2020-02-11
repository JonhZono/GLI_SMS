const mongoose = require('mongoose');

const StudentListSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    unique: true,
    required: true
  }
});

module.exports = StudentLists = mongoose.model(
  'StudentLists',
  StudentListSchema
);
