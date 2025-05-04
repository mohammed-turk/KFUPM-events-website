const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const {createEvent} = require('../controllers/eventController.js');

// POSTs
router.post('/admin/addEvent'||'/org/addEvent', async (req, res) => {
    try {
        const {title, provider, date, time, poster} = req.body; // Note: iconURL not icon

        if (!title || !provider || !date || !time || !poster) {
            return res.status(400).json({
                error: 'All fields are required',
            });
        }

        const newEvent = await createEvent({title, provider, date, time, poster});
        res.status(201).json({
            success: true,
            event: newEvent
        });

    } catch (error) {
        console.error("Backend error:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updated) {return res.status(404).json({error: 'Event does not exist'});}
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GETs
router.get('/',async (req, res) => {
    const Clubs = await Event.find();
    res.json(Clubs);
})

router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {return res.status(404).json({error: 'Event does not exist'});}
        res.json(event);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = router;