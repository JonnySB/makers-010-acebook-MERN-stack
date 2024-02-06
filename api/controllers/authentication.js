const bcrypt = require('bcryptjs');
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const createToken = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Auth Error: User not found");
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Auth Error: Passwords do not match");
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = generateToken(user.id);
    res.status(201).json({ token, message: "OK" });
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
