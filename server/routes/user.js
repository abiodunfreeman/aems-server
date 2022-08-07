const express = require('express');
const router = express.Router();
const { createUser, getUsers, deleteUser } = require('../controllers/User');

router.route('/:id/delete').delete(deleteUser);
router.route('/all').get(getUsers);
router.route('/signup').post(createUser);

module.exports = router;
