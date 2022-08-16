const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'please enter a username'],
    unique: [true, 'username taken, please choose a different name'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'please enter a password'],
  },
  status: {
    type: String,
    required: true,
    enum: ['admin', 'default'],
    default: 'default',
  },
});
module.exports = mongoose.model('User', UserSchema);
