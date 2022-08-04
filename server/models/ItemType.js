const mongoose = require('mongoose');
const ItemTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter a name for the new Type'],
  },
});

module.exports = mongoose.model('Item_Type', ItemTypeSchema);
