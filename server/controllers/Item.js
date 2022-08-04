const Item = require('../models/Item');

// @desc    Generate new Item
// @route   POST /item/new
// @access  Public
exports.postNewItem = async (req, res, next) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(200).json(newItem);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
exports.getItems = async (req, res, next) => {
  try {
    const foundItems = await Item.find();
    res.status(200).json(foundItems);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Fetch Items based on their type
// @route   GET /item/[type]
// @access  Public
exports.getTypes = async (req, res, next) => {
  try {
    const foundItemTypes = await Item.find({ category: req.params.type });
    console.log(req.params);
    res.status(200).json(foundItemTypes);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
