const Club = require("../models/Club");

// Fetch all clubs
const fetchClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}, "name icon"); // return only what's needed
    res.json(clubs);
  } catch (err) {
    console.error("Error fetching clubs:", err);
    res.status(500).json({ error: "Failed to fetch clubs" });
  }
};

module.exports = {
  fetchClubs,
};
