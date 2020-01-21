const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  }
})

module.exports = Classroom = mongoose.model('Classroom', ClassroomSchema);
