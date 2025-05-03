const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js"); // Single declaration at the top

// Signup Logic
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user");
  }
};

// Login Logic
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in");
  }
};

// Additional user functions
async function fetchUsers() {
  try {
    return await User.find();
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
}

async function createUser(userData) {
  try {
    const user = new User(userData);
    await user.save();
    console.log(`${user.username} created!`);
    return user.username;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
}

// Single export statement
module.exports = {
  signup,
  login,
  createUser,
  fetchUsers,
};
