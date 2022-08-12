const ItemInstance = require('../models/ItemInstance');
// @desc    Create an Item Instance
// @route   POST /iteminstance/new
// @access  Public
exports.createItemInstance = async (req, res, next) => {
  try {
    // pass user id and item id by req.body
    console.log(req.body);
    res.status(200).json({});
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
