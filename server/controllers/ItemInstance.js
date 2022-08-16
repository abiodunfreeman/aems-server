const ItemInstance = require('../models/ItemInstance');
// @desc    Create an Item Instance
// @route   POST /iteminstance/new
// @access  Public
exports.createItemInstance = async (req, res, next) => {
  try {
    // pass user id and item id by req.body
    // console.log(req.body);
    res.status(200).json({});
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Delete ItemInstace
// @route   PUT /item/instance/:id
// @access  Public
exports.deleteInstance = async (req, res, next) => {
  try {
    const deletedItem = await ItemInstance.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, deletedItem });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Get all item instances
// @route   GET /iteminstance/all
// @access  Public
exports.getInstances = async (req, res, next) => {
  try {
    const itemInstances = await ItemInstance.find()
      .populate('owner')
      .populate('item');
    res.status(200).json({ success: true, itemInstances });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
