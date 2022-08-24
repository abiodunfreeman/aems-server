const debug = require('debug')('User');
const User = require('../models/User');
const Item = require('../models/Item');
const ItemInstance = require('../models/ItemInstance');
const brcypt = require('bcryptjs');
// @desc    Create a new User
// @route   POST /user/signup
// @access  Public
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: await brcypt.hash(req.body.password, 10),
    });
    // console.log(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (err) {
    debug(`create user error: ${err}`);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    View All Users
// @route   GET /user/all
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Delete One User
// @route   DELETE /user/:id/delete
// @access  Public
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, deletedUser });
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    View One User
// @route   GET /user/:id
// @access  Public
exports.getOneUser = async (req, res, next) => {
  try {
    const oneUser = await User.findById(req.params.id);
    res.status(200).json({ success: true, oneUser });
  } catch (err) {
    debug(`get user error: ${err}`);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Change User Status
// @route   Put /user/:id
// @access  Public
exports.changeUserStatus = async (req, res, next) => {
  try {
    // console.log(req.body.status);
    const status = req.body.status === 'default' ? 'admin' : 'default';
    // console.log(`new status - ${status}`);
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Change User Status
// @route   Put /user/item/:id
// @access  Public
exports.addItem = async (req, res, next) => {
  try {
    const itemToAdd = await Item.findById(req.body.itemID);
    const numberOfItemsLoaned = await ItemInstance.find({
      item: req.body.itemID,
    }).countDocuments();
    if (numberOfItemsLoaned >= itemToAdd.quantity) {
      res
        .status(200)
        .json({ success: false, err: 'Not enough in stock to give' });
      return;
    }
    const owner = await User.findById(req.params.id);
    const instanceOfItem = await ItemInstance.create({
      item: req.body.itemID,
      status: 'Loaned',
      owner: req.params.id,
      notes: [`Assigned to ${owner.username}`],
    });
    const addedItem = await ItemInstance.findById(instanceOfItem._id)
      .populate('item')
      .populate('owner');
    // console.log(foundItem);

    res.status(200).json({ success: true, addedItem });
  } catch (err) {
    console.log(`${err.message}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Find ItemInstances User Has
// @route   Get /user/item/:id
// @access  Public
exports.getItemInstances = async (req, res, next) => {
  try {
    const userItems = await ItemInstance.find({
      owner: req.params.id,
    }).populate({
      path: 'item',
      populate: { path: 'category', model: 'Category' },
    });

    // console.log(userItems);
    res.status(200).json({ success: true, userItems });
  } catch (err) {
    // console.log(`${err.message}`.red);
    debug(`get instance error: ${err}`);
    res.status(400).json({ success: false, err: err.message });
  }
};
