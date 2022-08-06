const Item = require('../models/Item');
const Category = require('../models/Category');

// @desc    Generate new Item
// @route   POST /item/new
// @access  Public
exports.postNewItem = async (req, res, next) => {
  try {
    // console.log(req.body);
    const category = await Category.findById(req.body.category);
    console.log(category);
    const newItem = await Item.create({ ...req.body, category });
    res.status(200).json(newItem);
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
exports.getItems = async (req, res, next) => {
  try {
    const foundItems = await Item.find().populate('category');
    console.log(foundItems);
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
// @desc    Delete Item based on ID
// @route   Delete /item/delete/:id
// @access  Public
exports.deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, deletedItem });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
