const mongoose = require('mongoose');
const Model = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter the model type'],
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item_Type',
    required: true,
  },
});
