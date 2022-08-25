const express = require('express');
const router = express.Router();

const {
  createItemInstance,
  deleteInstance,
  getInstances,
  newNote,
  deleteNote,
  editInstanceOwner,
  editStatus,
} = require('../controllers/ItemInstance');
router.route('/all').get(getInstances);
router.route('/new').post(createItemInstance);
router.route('/notes/:id').post(newNote).put(deleteNote);
router.route('/status/:id').patch(editStatus);
router.route('/:id').delete(deleteInstance).patch(editInstanceOwner);

module.exports = router;
