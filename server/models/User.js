const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please enter a username'],
    unique: [true, 'username taken, please choose a different name'],
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
  },
  status: {
    type: String,
    required: true,
    enum: ['admin', 'default'],
    default: 'default',
  },
  currentItems: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model('User', UserSchema);
