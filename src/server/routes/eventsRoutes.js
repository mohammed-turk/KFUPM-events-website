const express = require("express");
const router = express.Router();
const Club = require("../models/Event");

router.get("/", async (req, res) => {
  try {
    const events = await Club.find({}, "title posterURL"); // Adjust if needed
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
