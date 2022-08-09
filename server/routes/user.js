const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  deleteUser,
  getOneUser,
} = require('../controllers/User');

router.route('/:id/delete').delete(deleteUser);
router.route('/all').get(getUsers);
router.route('/signup').post(createUser);
router.route('/:id').get(getOneUser);
module.exports = router;
