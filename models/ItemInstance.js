const mongoose = require('mongoose');
const ItemInstanceSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: [true, 'please specify what item is being lent out'],
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Loaned', 'Maintenance', 'Reserved'],
      default: 'Available',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);
