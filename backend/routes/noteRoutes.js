const express = require("express")
const { getNotes, setNote, deleteNote, updateNote } = require("../controllers/noteController")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router()

router.route("/").get(protect, getNotes).post(protect, setNote)
router.route("/:id").delete(protect, deleteNote).put(protect, updateNote)

module.exports = router