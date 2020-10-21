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
    type: Number,
    default: 1
  },
  password: {
    type: String,
    default: null
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Link', LinkSchema);
