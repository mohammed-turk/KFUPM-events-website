const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const eventController = require("../controllers/eventController");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find(); 
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


