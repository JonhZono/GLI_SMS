const mongoose = require('mongoose');

const DueFeeSchema = new mongoose.Schema(
  {
    additional: {
      type: String,
      maxlength: 100
    },
    gmailLists: {
      type: Array,
      default: []
    },
    amount: {
      type: String,
      required: true,
      maxlength: 100
    },
    month: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = DueFee = mongoose.model('DueFee', DueFeeSchema);
