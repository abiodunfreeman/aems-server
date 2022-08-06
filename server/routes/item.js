const express = require('express');
const router = express.Router();
const {
  postNewItem,
  getItems,
  getTypes,
  deleteItem,
} = require('../controllers/Item');

router.route('/all').get(getItems);
router.route('/new').post(postNewItem);

router.route('/delete/:id').delete(deleteItem);
router.route('/:type').get(getTypes);

module.exports = router;
