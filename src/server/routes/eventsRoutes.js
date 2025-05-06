const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { createEvent } = require("../controllers/eventController.js");
const mongoose = require("mongoose");

// POST - Create new event
router.post("/addEvent", async (req, res) => {
  try {
    const { title, timing, posterURL, location, info, provider} = req.body;
    const newEvent = await createEvent({
      title, timing, posterURL, location, info, provider
    });
    res.status(201).json(newEvent); // Send the newly created event directly
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET - List all events (without pagination, returning only the array)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("provider", "name")
      .sort({ timing: -1 });

    res.json(events); // Send the array of events directly
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Server error while fetching events" });
  }
});

// GET - Get single event
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    const event = await Event.findById(req.params.id).populate(
      "provider",
      "name email iconURL"
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event); // Send the single event object directly
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Server error while fetching event" });
  }
});

// PUT - Update event
router.put("/:id", async (req, res) => {
  try {
    const { title, provider, timing, posterUrl } = req.body;

    const existingEvent = await Event.findById(req.params.id);
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (title) existingEvent.title = title;
    if (provider) {
      if (!mongoose.Types.ObjectId.isValid(provider)) {
        return res.status(400).json({ error: "Invalid provider ID format" });
      }
      existingEvent.provider = provider;
    }
    if (timing) {
      if (isNaN(new Date(timing).getTime())) {
        return res.status(400).json({ error: "Invalid timing format" });
      }
      existingEvent.timing = timing;
    }
    if (posterUrl !== undefined) existingEvent.posterUrl = posterUrl;

    const updatedEvent = await existingEvent.save();

    res.json(updatedEvent); // Send the updated event object directly
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Server error while updating event" });
  }
});

// DELETE - Remove event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" }); // Send a simple success message
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Server error while deleting event" });
  }
});

module.exports = router;
