const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username value'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password value']
  }
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
