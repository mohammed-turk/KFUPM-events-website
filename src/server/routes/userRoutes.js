const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {createUser} = require('../config/db.js');

// POSTs
router.post('/signup', async (req, res) => {
    try {
        const {name, username, email, password} = req.body;
        const newUser = await createUser({name, username, email, password});
        res.status(201).json({
            success: true,
            message: 'User successfully created!',
            user:{username: newUser.username}
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post('/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updated) {return res.status(404).json({error: 'User does not exist'});}
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//GETs
router.get('/',async (req, res) => {
    const Users = await User.find();
    res.json(Users);
})

router.get('/:id', async (req, res) => {
    try {
        const User = await User.findById(req.params.id);
        if (!User) {return res.status(404).json({error: 'User does not exist'});}
        res.json(User);
    }catch(error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = router;