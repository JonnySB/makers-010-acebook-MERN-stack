const User = require("../models/user");

// password validator in the backend
const validatePassword = (password) => {
    // min 8 characters, at least one special character, one number, and one capital letter
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const create = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;
    
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password does not meet the criteria.' });
    }

  const user = new User({ username, email, password, dob });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const UsersController = {
  create: create,
};

module.exports = UsersController;
