const express = require('express');
const router = express.Router();

const { createItemInstance } = require('../controllers/ItemInstance');

router.route('/new').post(createItemInstance);

module.exports = router;
