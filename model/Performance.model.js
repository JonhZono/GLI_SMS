const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema(
  {
    writing: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    reading: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    listening: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    speaking: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    participation: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    active: {
      type: Number,
      default: 0, //0/10
      max: 10,
      required: true
    },
    attitude: {
      type: Number,
      default: 0, //0/10
      max: 10,
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

module.exports = Performance = mongoose.model('Performance', PerformanceSchema);
