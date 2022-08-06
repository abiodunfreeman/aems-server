const express = require('express');
const router = express.Router();
const {
  createCategory,
  viewCategories,
  viewOneCategory,
  deleteCategory,
} = require('../controllers/Category');

router.route('/all').get(viewCategories);
router.route('/new').post(createCategory);

router.route('/:id').get(viewOneCategory).delete(deleteCategory);
module.exports = router;
