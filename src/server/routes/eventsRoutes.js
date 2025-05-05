const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const {createEvent} = require('../controllers/eventController.js');
const mongoose = require('mongoose');

// POST - Create new event
router.post('/addEvent', async (req, res) => {
    try {
        console.log("reached the route...");
        const {title, provider, date, timing, posterUrl} = req.body;
        const newEvent = await createEvent({
            date: date,
            posterURL: posterUrl,
            provider: provider,
            timing: timing,
            title: title,
        });

        res.status(201).json({
            success: true,
            event: newEvent
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// GET - List all events (with pagination)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const events = await Event.find()
            .populate('provider', 'name')
            .sort({ timing: -1 })
            .skip(skip)
            .limit(limit);

        const totalEvents = await Event.countDocuments();

        res.json({
            success: true,
            count: events.length,
            total: totalEvents,
            page,
            pages: Math.ceil(totalEvents / limit),
            events
        });

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while fetching events'
        });
    }
});

// GET - Get single event
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid event ID format'
            });
        }

        const event = await Event.findById(req.params.id)
            .populate('provider', 'name email iconURL');

        if (!event) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        res.json({
            success: true,
            event
        });

    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while fetching event'
        });
    }
});

// PUT - Update event
router.put('/:id', async (req, res) => {
    try {
        const { title, provider, timing, posterUrl } = req.body;

        // Validate event exists
        const existingEvent = await Event.findById(req.params.id);
        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        // Update fields
        if (title) existingEvent.title = title;
        if (provider) {
            if (!mongoose.Types.ObjectId.isValid(provider)) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid provider ID format'
                });
            }
            existingEvent.provider = provider;
        }
        if (timing) {
            if (isNaN(new Date(timing).getTime())) {
                return res.status(400).json({
                    success: false,
                    error: 'Invalid timing format'
                });
            }
            existingEvent.timing = timing;
        }
        if (posterUrl !== undefined) existingEvent.posterUrl = posterUrl;

        const updatedEvent = await existingEvent.save();

        res.json({
            success: true,
            message: 'Event updated successfully',
            event: updatedEvent
        });

    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while updating event'
        });
    }
});

// DELETE - Remove event
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                error: 'Event not found'
            });
        }

        res.json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while deleting event'
        });
    }
});

module.exports = router;