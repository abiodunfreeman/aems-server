const mongoose = require('mongoose');
const ItemSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category needed'],
    },
    brand: {
      type: String,
      required: [true, 'please list the brand'],
    },
    model: {
      type: String,
      required: [true, 'please enter what specify what version this item is'],
      unique: [
        true,
        'There is already this model in the database, first delete that one or update it instead',
      ],
    },
    quantity: {
      type: Number,
      required: [true, 'how many are there currently?'],
    },
    price: {
      type: Number,
      required: [true, 'how much does each unit cost?'],
    },
    notes: String,
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema);
