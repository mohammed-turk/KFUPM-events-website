const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// SIGNUP - no password hashing
const signup = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({
      name,
      username,
      email,
      password, // plain password (for now)
      usertype: role || 2,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        username: newUser.username,
        id: newUser._id,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Error registering user" });
  }
};

// LOGIN - plain-text password match
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    // plain-text password comparison
    if (password !== user.password)
      return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.usertype },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in");
  }
};

// Optional: createUser if used elsewhere
async function createUser(userData) {
  try {
    const user = new User(userData); // assumes plain password
    await user.save();
    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}

module.exports = {
  signup,
  login,
  createUser,
};
