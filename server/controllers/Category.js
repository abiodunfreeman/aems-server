const Category = require('../models/Category');

// @desc    Create a new Category
// @route   POST /category/new
// @access  Public
exports.createCategory = async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    View All Categories
// @route   GET /category/all
// @access  Public
exports.viewCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    View One Category
// @route   GET /category/:id
// @access  Public
exports.viewOneCategory = async (req, res, next) => {
  try {
    const oneCategory = await Category.findById(req.params.id);
    res.status(200).json(oneCategory);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
exports.deleteCategory = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, deletedCategory });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
