const express = require('express');
const router = express.Router();

const {
  createItemInstance,
  deleteInstance,
  getInstances,
  newNote,
} = require('../controllers/ItemInstance');
router.route('/all').get(getInstances);
router.route('/new').post(createItemInstance);
router.route('/:id').delete(deleteInstance).post(newNote);

module.exports = router;
