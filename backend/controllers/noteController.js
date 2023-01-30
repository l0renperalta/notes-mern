const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const User = require('../models/userModel');

// @desc    get user notes
// @route   GET /api/notes
// @access  private
const getNotes = asyncHandler(async (req, res) => {
   const note = await Note.find({ user_id: req.user.id });
   res.json(note);
});

// @desc    create a note
// @route   POST /api/note
// @access  private
const createNote = asyncHandler(async (req, res) => {
   if (!req.body.title || !req.body.description) {
      res.status(400);
      throw new Error('Please add required fields');
   }

   const note = await Note.create({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
   });
   res.status(200).json(note);
});

// @desc    update a note
// @route   PUT /api/note/:id
// @access  private
const updateNote = asyncHandler(async (req, res) => {
   const note = await Note.findById(req.params.id);
   if (!note) {
      res.status(400);
      throw new Error('Note not found');
   }

   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error('User not found');
   }

   if (note.user_id.toString() !== user.id) {
      res.status(400);
      throw new Error('User not authorized');
   }

   const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(updatedNote);
});

// @desc    delete a note
// @route   DELETE /api/note:id
// @access  private
const deleteNote = asyncHandler(async (req, res) => {
   const note = await Note.findById(req.params.id);
   if (!note) {
      res.status(400);
      throw new Error('Note not found');
   }

   const user = await User.findById(req.user.id);

   if (!user) {
      res.status(401);
      throw new Error('User not found');
   }

   if (note.user_id.toString() !== user.id) {
      res.status(400);
      throw new Error('User not authorized');
   }

   await note.remove();

   res.json(req.params.id);
});

module.exports = {
   getNotes,
   createNote,
   updateNote,
   deleteNote,
};
