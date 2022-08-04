const express = require('express');
const router = express.Router();
const { postNewItem, getItems, getTypes } = require('../controllers/Item');

router.route('/all').get(getItems);
router.route('/new').post(postNewItem);

router.route('/:type').get(getTypes);

module.exports = router;
