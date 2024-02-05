const User = require("../models/user");
const { generateToken } = require("../lib/token");

// password validator in the backend
const validatePassword = (password) => {
  // min 8 characters, at least one special character, one number, and one capital letter
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ message: "Password does not meet the criteria." });
  }

  const userDob = new Date(dob);
  if(isNaN(userDob.getTime())) {
    return res.status(400).json({ message: 'Invalid date of birth'});
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0); // handles time difference - so to have a comparison point between birthdate and todays date
  const userAge = today.getFullYear() - userDob.getFullYear() -
  ((today.getMonth() < userDob.getMonth() ||
  (today.getMonth() === userDob.getMonth() && today.getDate() < userDob.getDate())) ? 1 : 0);
  console.log("The user age is -> ", userAge);
  if(userAge < 13) {
    return res.status(400).json({ message: 'User must be at least 13 years old.' });
  }

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password does not meet the criteria.' });
    }
    const user = new User({ username, email, password, dob });
    await user.save();
    console.log("User created, id:", user._id.toString());
    res.status(201).json({ message: "User created successfully" });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password -email");
  const newToken = generateToken(req.user_id);
  res.status(200).json({ user: user, token: newToken });
};

const UsersController = {
  create: create,
  getUserById: getUserById,
};

module.exports = UsersController;
