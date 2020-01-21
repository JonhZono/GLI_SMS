const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: true,
    unique: true
  }
});

module.exports = Position = mongoose.model('Position', PositionSchema);
