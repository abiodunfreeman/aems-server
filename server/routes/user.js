const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
  getOneUser,
  changeUserStatus,
  addItem,
} = require('../controllers/User');

router.route('/:id/delete').delete(deleteUser);
router.route('/all').get(getUsers);
router.route('/signup').post(createUser);
router.route('/item/:id').put(addItem);
router.route('/:id').get(getOneUser).put(changeUserStatus);
module.exports = router;
