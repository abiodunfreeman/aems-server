const express = require('express');
const router = express.Router();

const {
  createItemInstance,
  deleteInstance,
  getInstances,
} = require('../controllers/ItemInstance');
router.route('/all').get(getInstances);
router.route('/new').post(createItemInstance);
router.route('/:id').delete(deleteInstance);

module.exports = router;
