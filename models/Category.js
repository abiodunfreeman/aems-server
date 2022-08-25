const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter a category name'],
    unique: [true, 'name already being used'],
    lowercase: true,
  },
});
module.exports = mongoose.model('Category', CategorySchema);
