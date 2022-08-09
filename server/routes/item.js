const express = require('express');
const router = express.Router();
const {
  postNewItem,
  getItems,
  getTypes,
  deleteItem,
  getOneItem,
} = require('../controllers/Item');

router.route('/all').get(getItems);
router.route('/new').post(postNewItem);

router.route('/delete/:id').delete(deleteItem);
router.route('/category/:type').get(getTypes);
router.route('/:id').get(getOneItem);

module.exports = router;
