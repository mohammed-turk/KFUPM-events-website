const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    usertype: { type: Number, required: true, default: 2 }, // 0=admin, 1=org, 2=user
  },
  { collection: "User" }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
