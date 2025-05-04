const Event = require("../models/Event");

// Fetch all clubs
const fetchEvents = async (req, res) => {
  try {
    const events = await Event.find({}, "title posterURL"); // return only what's needed
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

module.exports = {
    fetchEvents,
};
