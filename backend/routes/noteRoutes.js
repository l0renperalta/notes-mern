const express = require('express');
const router = express.Router();
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, getNotes);
router.post('/', isAuthenticated , createNote);
router.put('/:id', isAuthenticated , updateNote);
router.delete('/:id', isAuthenticated, deleteNote);

module.exports = router;
