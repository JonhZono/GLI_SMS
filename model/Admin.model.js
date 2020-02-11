const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
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
    bio: {
      type: String,
      required: true
    },
    admission: {
      type: String,
      required: true
    },
    birth: {
      type: String,
      required: true
    },
    marital_status: {
      type: String,
      required: true
    },
    addresses: {
      type: [String],
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: '@JIPROCE'
    },
    country: {
      type: String,
      required: true
    },
    work_experiences: {
      type: String,
      required: true
    },
    bank_account_details: {
      type: [String]
    },
    image: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = AdminProfile = mongoose.model('admin', AdminSchema);
