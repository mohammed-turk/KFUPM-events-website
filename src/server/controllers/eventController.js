const Event = require("../models/Event");

// Fetch all events
const fetchEvents = async (req, res) => { // Make this an async function
  try {
    const events = await Event.find(); // return only what's needed
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = {
  fetchEvents,
};