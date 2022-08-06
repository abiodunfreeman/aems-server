const mongoose = require('mongoose');
const Model = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter the model type'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});
