const asyncHandler = require("express-async-handler")

const Note = require("../models/noteModel")
const User = require("../models/userModel")

// @desc Get notes
// @route Get /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.status(200).json(notes)
})

// @desc Set note
// @route Post /api/notes
// @access Private
const setNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body

  if (!req.body.title || !req.body.content) {
    res.status(400)
    throw new Error("Please add both title and content...")
  }
  const note = await Note.create({
    title: title,
    content: content,
    user: req.user.id,
  })
  res.status(200).json(note)
})

// @desc update note
// @route Put /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)
  const { title, content } = req.body

  if (!note) {
    res.status(400);
    throw new Error("Note not found")
  }

  if (!req.body.title || !req.body.content) {
    res.status(400);
    throw new Error("Provide both field please...")
  }

  // const user = await User.findById(req.user.id)  //if authMiddleware worked well then it will return req.user

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title: title, content: content }, { new: true })

  res.status(200).json(updatedNote)
})

// @desc Delete note
// @route Delete /api/notes/:id
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (!note) {
    res.status(400)
    throw new Error("Note not found")
  }

  // const user = await User.findById(req.user.id)   //! If authMiddleware worked well then it will return us req.user

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error("User not found")
  }

  // Make sure the logged in user matches the note user
  if (note.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await note.remove();
  res.status(200).json({ id: req.params.id })
})


module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote
}
