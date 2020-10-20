const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  original_name: {
    type: String,
    required: true
  },
  downloads: {
    type: Number
  },
  password: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: 'anonymous'
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Link', LinkSchema);
