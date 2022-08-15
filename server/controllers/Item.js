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
    console.log(req.params.type);
    const category = await Category.find({ name: req.params.type });
    // console.log(category);
    const itemsOfCategory = await Item.find({ category }).populate('category');
    // console.log(itemsOfCategory);
    res.status(200).json(itemsOfCategory);
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
    if (req.user) {
      if (req.user.status === 'admin') {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, deletedItem });
      } else {
        res.status(200).json({ success: false, err: 'insufficient rights' });
      }
    } else {
      res.status(200).json({ success: false, err: 'not logged in' });
    }
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Get one Item based on req.params.id
// @route   GET /item/:id
// @access  Public
exports.getOneItem = async (req, res, next) => {
  try {
    const oneItem = await Item.findById(req.params.id);
    if (!oneItem) {
      res
        .status(200)
        .json({ success: false, err: 'Cant find item with given id' });
    }
    res.status(200).json({ success: true, item: oneItem });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Edit Item
// @route   PUT /item/:id
// @access  Public
exports.editItem = async (req, res, next) => {
  try {
    console.log(req.body);
    const editedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, editedItem });
    // .json({success: true, editedItem})
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
