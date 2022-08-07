const mongoose = require('mongoose');
const ItemInstanceSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'please specify what item is being lent out'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Loaned', 'Maintenance', 'Reserved'],
    default: 'Maintenance',
  },
  notes: [String],
});
module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);
