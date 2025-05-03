const express = require('express');
const Club = require('../models/Club');
const router = express.Router();
const {createClub} = require('../controllers/clubController.js');

// POSTs
router.post('/admin/addOrg', async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Add this log

        const { name, email, password, icon } = req.body; // Note: iconURL not icon

        if (!name || !email || !password || !icon) {
            return res.status(400).json({
                error: 'All fields are required',
                received: req.body // This will show what actually arrived
            });
        }

        const newClub = await createClub({ name, email, password, icon });
        res.status(201).json({
            success: true,
            club: newClub
        });

    } catch (error) {
        console.error("Backend error:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const updated = await Club.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updated) {return res.status(404).json({error: 'Club does not exist'});}
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GETs
router.get('/',async (req, res) => {
    const Clubs = await Club.find();
    res.json(Clubs);
})

router.get('/:id', async (req, res) => {
    try {
        const User = await Club.findById(req.params.id);
        if (!User) {return res.status(404).json({error: 'user does not exist'});}
        res.json(User);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = router;