const express = require("express");
const router = express.Router();
const Club = require("../models/Club");

router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find({}, "name iconURL"); // Adjust if needed
    res.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
