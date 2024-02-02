const User = require("../models/user");

// password validator in the backend
const validatePassword = (password) => {
    // min 8 characters, at least one special character, one number, and one capital letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const dob = req.body.dob;

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

const UsersController = {
  create: create,
};

module.exports = UsersController;
