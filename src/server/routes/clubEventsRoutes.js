const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.get("/:provider", async (req, res) => {
    try {
        const events = await Event.getEventByClub(req.params.provider);
        res.json(events);
    } catch (e) {
        console.error("Error at getting club's events route", e);
    }
})

module.exports = router;
