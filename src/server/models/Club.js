const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    iconURL: { type: String, required: true }, // Cloudinary or other public image link
  },
  { collection: "Club" }
);

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
