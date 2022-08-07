const User = require('../models/User');
const brcypt = require('bcryptjs');
// @desc    Create a new User
// @route   POST /user/signup
// @access  Public
exports.createUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newUser = await User.create({
      username: req.body.username,
      password: await brcypt.hash(req.body.password, 10),
    });
    console.log(newUser);
    res.status(200).json({ success: true, newUser });
  } catch (err) {
    console.log(`${err.message}`.red);
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
