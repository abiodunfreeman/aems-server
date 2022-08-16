const express = require('express');
const router = express.Router();

const {
  createItemInstance,
  deleteInstance,
} = require('../controllers/ItemInstance');

router.route('/:id').delete(deleteInstance);
router.route('/new').post(createItemInstance);

module.exports = router;
