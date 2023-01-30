const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a title values']
  },
  description: {
    type: String,
    required: [true, 'Please add a description value']
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Note', noteSchema);
