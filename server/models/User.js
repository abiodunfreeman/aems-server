const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please enter a username'],
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
  },
  currentItems: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model('User', UserSchema);
