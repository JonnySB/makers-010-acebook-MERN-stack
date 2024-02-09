const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

// password validator in the backend
const validatePassword = (password) => {
  // min 8 characters, at least one special character, one number, and one capital letter
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  return passwordRegex.test(password);
};

//TODO: Can rename create to createUser?
const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const profileImg = process.env.CLOUDINARY_BASE_URL + "profile/default";

  const userDob = new Date(dob);
  if(isNaN(userDob.getTime())) {
    return res.status(400).json({ message: 'Invalid date of birth'});
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0); // handles time difference - so to have a comparison point between birthdate and todays date

  const userAge = today.getFullYear() - userDob.getFullYear() -
  ((today.getMonth() < userDob.getMonth() ||
  (today.getMonth() === userDob.getMonth() && today.getDate() < userDob.getDate())) ? 1 : 0);
  

  
  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if(userAge < 13) {
      return res.status(400).json({ message: 'User must be at least 13 years old.' });
    }
    
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the criteria." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      dob,
      firstName,
      lastName,
      profileImg
    });
    await user.save();
    // console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.user_id;
  const user = await User.findById(userId).select("-password -email");
  const newToken = generateToken(req.user_id);
  res.status(200).json({ user: user, user_id: req.user_id, token: newToken });
};

const updateBio = async (req, res) => {
  const userId = req.user_id;
  const bio = req.body.bio;

  try {
    const updatedBio = await User.findByIdAndUpdate(
      userId,
      { bio: bio },
      { new: true }
    );

    const newToken = generateToken(req.user_id);

    res.status(200).json({ message: "Bio updated successfully", token: newToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//TODO: Need to generate new token for the following methods
const updateCurrentLocation = async (req, res) => {
  const userId = req.user_id;
  const currentLocation = req.body.currentLocation;

  try {
    const updatedCurrentLocation = await User.findByIdAndUpdate(
      userId,
      { currentLocation: currentLocation },
      { new: true }
    );

    res.status(200).json({ message: "Current location updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateWorkplace = async (req, res) => {
  const userId = req.user_id;
  const workplace = req.body.workplace;

  try {
    const updatedWorkplace = await User.findByIdAndUpdate(
      userId,
      { workplace: workplace },
      { new: true }
    );

    res.status(200).json({ message: "Workplace updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEducation = async (req, res) => {
  const userId = req.user_id;
  const education = req.body.education;

  try {
    const updateEducation = await User.findByIdAndUpdate(
      userId,
      { education: education },
      { new: true }
    );

    res.status(200).json({ message: "Education updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const UsersController = {
  create: create,
  login: login,
  getUserById: getUserById,
  updateBio: updateBio,
  updateCurrentLocation: updateCurrentLocation,
  updateWorkplace: updateWorkplace,
  updateEducation: updateEducation,
};

module.exports = UsersController;
