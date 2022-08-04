const express = require('express');
const router = express.Router();
const { postNewItem, getItems } = require('../controllers/Item');

router.route('/all').get(getItems);
router.route('/new').post(postNewItem);

module.exports = router;
