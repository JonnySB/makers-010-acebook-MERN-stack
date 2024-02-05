const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    bio: { type: String, required: false },
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
