const Event = require('../models/Event');
const cloudinary = require('../utils/cloudinary');

async function fetchEvents() {
    try {
        return await Event.find();
    } catch (err) {
        console.error('Error fetching events:', err);
        throw err;
    }
}

async function createEvent(eventData) {
    try {
        const result = await cloudinary.uploader.upload(eventData.posterURL);
        eventData.posterURL = result.secure_url;
        const event = new Event(eventData);
        await event.save();
        console.log(`${event.title} created!`);
        return event.title;
    } catch(err) {
        console.error('Error creating event:', err);
        throw err;
    }
}

module.exports = { createEvent, fetchEvents};const Event = require("../models/Event");

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