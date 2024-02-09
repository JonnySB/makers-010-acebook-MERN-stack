const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, required: false },
  currentLocation: { type: String, required: false },
  workplace: { type: String, required: false },
  education: { type: String, required: false },
  friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  profileImg: { type: String, required: false }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
