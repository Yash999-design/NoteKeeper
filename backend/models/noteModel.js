const mongoose = require("mongoose")

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",   //refrencing User model
    },
    title: {
      type: String,
      required: [true, "Please add title of your note"],
    },
    content: {
      type: String,
      required: [true, "Please add content"]
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", noteSchema)