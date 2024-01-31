const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, required: true },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
